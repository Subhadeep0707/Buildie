import Material from "../models/materialModel.js";

// Fetch materials (User custom rates take priority over global default rates)
const getMaterials = async (req, res) => {
  try {
    const { city, category, search } = req.query;
    const userId = req.user ? req.user._id : null;
    let baseQuery = {};
    if (city) baseQuery.city = new RegExp(`^${city}$`, "i");
    if (category) baseQuery.category = category;
    if (search) baseQuery.name = new RegExp(search, "i");

    // Fetch user-specific custom rates alongside global defaults
    let query = {
      ...baseQuery,
      $or: [{ userId: userId }, { userId: null }],
    };
    const materials = await Material.find(query).sort({ updatedAt: -1 });

    // Deduplicate: user custom rate takes precedence over global rate
    const materialMap = new Map();
    materials.forEach((item) => {
      const name = (item.name || "").toLowerCase().trim();
      const brand = (item.brand || "").toLowerCase().trim();
      const cityVal = (item.city || "").toLowerCase().trim();
      const key = `${name}-${brand}-${cityVal}`;

      // Prefer user-specific record over global default
      if (!materialMap.has(key) || item.userId) {
        materialMap.set(key, item);
      }
    });

    const finalMaterials = Array.from(materialMap.values());
    res.status(200).json({
      success: true,
      count: finalMaterials.length,
      data: finalMaterials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Save or Upsert custom user rates and synchronize MongoDB records
const saveCustomRates = async (req, res) => {
  try {
    const { materials, city: fallbackCity } = req.body;
    const userId = req.user._id;

    if (!Array.isArray(materials)) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of material updates",
      });
    }

    const targetCity =
      fallbackCity ||
      (materials.length > 0 && materials[0].city ? materials[0].city : "Kolkata");

    // Filter out empty rows
    const validMaterials = materials.filter(
      (item) => item && item.name && item.name.trim() !== "",
    );

    // Upsert the materials submitted by the user
    const updatedMaterials = await Promise.all(
      validMaterials.map(async (item) => {
        const name = (item.name || "").trim();
        const brand = (item.brand || "Generic / Local").trim();
        const itemCity = (item.city || targetCity).trim();
        const minPrice = Number(item.minPrice) || 0;
        const maxPrice = Number(item.maxPrice) || 0;
        const avgPrice = Math.round((minPrice + maxPrice) / 2);

        return await Material.findOneAndUpdate(
          {
            name,
            brand,
            city: new RegExp(`^${itemCity}$`, "i"),
            userId,
          },
          {
            name,
            brand,
            category: item.category || "Other",
            unit: item.unit || "bag",
            city: itemCity,
            minPrice,
            maxPrice,
            avgPrice,
            userId,
            lastUpdated: new Date(),
          },
          { new: true, upsert: true, runValidators: true },
        );
      }),
    );

    const savedIds = updatedMaterials.map((doc) => doc._id);

    // Permanently remove any custom materials for this user in this city that are not in the submitted list
    await Material.deleteMany({
      userId,
      city: new RegExp(`^${targetCity.trim()}$`, "i"),
      _id: { $nin: savedIds },
    });

    res.status(200).json({
      success: true,
      data: updatedMaterials,
    });
  } catch (error) {
    console.error("Save Custom Rates Error:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Create global material rate
const createMaterial = async (req, res) => {
  try {
    const { name, brand, category, unit, city, minPrice, maxPrice } = req.body;
    const avgPrice = Math.round((Number(minPrice) + Number(maxPrice)) / 2);
    const material = await Material.findOneAndUpdate(
      { name, brand: brand || "Generic / Local", city, userId: null },
      { category, unit, minPrice, maxPrice, avgPrice, lastUpdated: new Date() },
      { new: true, upsert: true, runValidators: true },
    );
    res.status(201).json({
      success: true,
      data: material,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update material rate
const updateMaterial = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.body;
    let updateData = { ...req.body };
    if (minPrice !== undefined && maxPrice !== undefined) {
      updateData.avgPrice = Math.round(
        (Number(minPrice) + Number(maxPrice)) / 2,
      );
    }
    updateData.lastUpdated = new Date();
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      });
    }

    res.status(200).json({
      success: true,
      data: material,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete material rate permanently by ID
const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Material deleted successfully",
      data: { id: req.params.id },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Real-time source verification endpoint
const verifyLiveMarketSource = async (req, res) => {
  try {
    const { city, category } = req.query;
    const sourcePortal = "https://infralens.in/prices";
    const redirectUrl = city
      ? `${sourcePortal}?city=${encodeURIComponent(city)}`
      : sourcePortal;
    res.status(200).json({
      success: true,
      verificationSource: "InfraLens Price Matrix",
      redirectUrl,
      queryContext: {
        city: city || "All Cities",
        category: category || "All Categories",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate live source verification link",
    });
  }
};

export {
  createMaterial,
  getMaterials,
  saveCustomRates,
  updateMaterial,
  deleteMaterial,
  verifyLiveMarketSource,
};