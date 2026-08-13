import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // e.g., "OPC 53 Grade Cement" or "Tata Tiscon 12mm"
    brand: { type: String, default: "Generic / Local" }, // e.g., "UltraTech", "Tata Tiscon", "JSW"
    category: {
      type: String,
      required: true,
      enum: [
        "Cement",
        "Steel",
        "Bricks",
        "Sand",
        "Aggregate",
        "Labor",
        "Tiles",
        "Paint",
        "Plumbing",
        "Electrical",
        "Other",
      ],
    },
    unit: {
      type: String,
      required: true,
      enum: ["kg", "ton", "bag", "cft", "sqft", "nos", "day", "litre", "metre"],
    },
    city: { type: String, required: true, index: true }, // e.g., "Kolkata", "Mumbai", "Bangalore", "Delhi"
    minPrice: { type: Number, required: true }, // Dealer rate lower bound
    maxPrice: { type: Number, required: true }, // Retail rate upper bound
    avgPrice: { type: Number, required: true }, // Median benchmark price
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model("Material", materialSchema);
