import Material from "../models/materialModel.js";

const createMaterial = async (req, res) => {
  try {
    const { name, category, unit, unitPrice } = req.body;
    const material = await Material.create({
      name,
      category,
      unit,
      unitPrice,
    });

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

const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find().sort({ createdAt: -1 });

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
// Update a material
const updateMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after", // Returns the updated document instead of the old one
      runValidators: true, // Ensures the updated data still follows your enum/min rules
    });

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

// Delete a material
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
      data: {}, // Convention is to return an empty object on successful delete
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export { createMaterial, getMaterials, updateMaterial, deleteMaterial };
