import Material from "../models/materialModel.js";

//  Fetch materials (User custom rates take priority over global default rates)
const getMaterials = async (req, res) => {
  try {
    const { city, category, search } = req.query;
    // If auth middleware is applied and user is logged in, extract ID. Otherwise, null.
    const userId = req.user ? req.user._id : null;
    let baseQuery = {};
    if (city) baseQuery.city = new RegExp(city, "i");
    if (category) baseQuery.category = category;
    if (search) baseQuery.name = new RegExp(search, "i");
    // Fetch user-specific custom rates if authenticated, alongside global defaults
    let query = {
      ...baseQuery,
      $or: [{ userId: userId }, { userId: null }],
    };
    const materials = await Material.find(query).sort({ updatedAt: -1 });
    //  If both a custom rate and global rate exist for the same material, prefer custom
    const materialMap = new Map();
    materials.forEach((item) => {
      const key = `${item.name.toLowerCase()}-${item.brand.toLowerCase()}-${item.city.toLowerCase()}`;
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
//  Save or Upsert custom user rates
const saveCustomRates = async (req, res) => {
  try {
    const { materials } = req.body;
    const userId = req.user._id;

    if (!Array.isArray(materials) || materials.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of material updates",
      });
    }
    const updatedMaterials = await Promise.all(
      materials.map(async (item) => {
        const { name, brand, category, unit, city, minPrice, maxPrice } = item;
        const avgPrice = Math.round((Number(minPrice) + Number(maxPrice)) / 2);
        return await Material.findOneAndUpdate(
          { name, brand: brand || "Generic / Local", city, userId },
          {
            category,
            unit,
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

    res.status(200).json({
      success: true,
      data: updatedMaterials,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//  Create global material rate
const createMaterial = async (req, res) => {
  try {
    const { name, brand, category, unit, city, minPrice, maxPrice } = req.body;
    const avgPrice = Math.round((Number(minPrice) + Number(maxPrice)) / 2);
    // Explicitly set userId to null to ensure it is a global default
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
//  Update material rate
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

// Delete material rate
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
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//  Real-time fact-checking source verification endpoint linking to InfraLens
const verifyLiveMarketSource = async (req, res) => {
  try {
    const { city, category } = req.query;
    const sourcePortal = "https://infralens.in/prices";
    // Construct dynamic redirect URL for live market verification
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
