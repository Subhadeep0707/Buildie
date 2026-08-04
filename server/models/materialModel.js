import mongoose from "mongoose";
const materialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a material or labor name"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: [
        "Cement",
        "Steel",
        "Bricks",
        "Sand",
        "Aggregate",
        "Labor",
        "Other",
      ],
    },
    unit: {
      type: String,
      required: [true, "Please specify the unit of measurement"],
      enum: ["kg", "ton", "bag", "cft", "sqft", "nos", "day"], // Common civil engineering units
    },
    unitPrice: {
      type: Number,
      required: [true, "Please add the price per unit"],
      min: [0, "Price cannot be negative"],
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
  },
);

export default mongoose.model("Material", materialSchema);  // Material is the tag that makes schema and unique identifier in mongoDB
