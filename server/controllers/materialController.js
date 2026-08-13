import Material from "../models/materialModel.js";

// 1. Create or Upsert material rate
const createMaterial = async (req, res) => {
  try {
    const { name, brand, category, unit, city, minPrice, maxPrice } = req.body;
    const avgPrice = Math.round((Number(minPrice) + Number(maxPrice)) / 2);
    const material = await Material.findOneAndUpdate(
      { name, brand: brand || "Generic / Local", city },
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

//Get materials with optional city, category, and search filters
const getMaterials = async (req, res) => {
  try {
    const { city, category, search } = req.query;
    let query = {};
    if (city) query.city = new RegExp(city, "i");
    if (category) query.category = category;
    if (search) query.name = new RegExp(search, "i");
    const materials = await Material.find(query).sort({ updatedAt: -1 });
    res.status(200).json({
      success: true,
      count: materials.length,
      data: materials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
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

//  Delete material rate
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
  updateMaterial,
  deleteMaterial,
  verifyLiveMarketSource,
};
