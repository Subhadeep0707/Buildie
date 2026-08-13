import mongoose from "mongoose";
import Material from "../models/materialModel.js";

const seedMaterialRates = async () => {
  try {
    const count = await Material.countDocuments();
    if (count === 0) {
      const defaultRates = [
        {
          name: "OPC 53 Grade Cement",
          brand: "UltraTech",
          category: "Cement",
          unit: "bag",
          city: "Kolkata",
          minPrice: 360,
          maxPrice: 410,
          avgPrice: 385,
        },
        {
          name: "OPC 53 Grade Cement",
          brand: "UltraTech",
          category: "Cement",
          unit: "bag",
          city: "Mumbai",
          minPrice: 370,
          maxPrice: 420,
          avgPrice: 395,
        },
        {
          name: "OPC 53 Grade Cement",
          brand: "UltraTech",
          category: "Cement",
          unit: "bag",
          city: "Bangalore",
          minPrice: 365,
          maxPrice: 415,
          avgPrice: 390,
        },
        {
          name: "OPC 53 Grade Cement",
          brand: "UltraTech",
          category: "Cement",
          unit: "bag",
          city: "Delhi",
          minPrice: 355,
          maxPrice: 400,
          avgPrice: 378,
        },
        {
          name: "TMT Rebar 12mm",
          brand: "Tata Tiscon",
          category: "Steel",
          unit: "kg",
          city: "Mumbai",
          minPrice: 66,
          maxPrice: 74,
          avgPrice: 70,
        },
        {
          name: "TMT Rebar 12mm",
          brand: "Tata Tiscon",
          category: "Steel",
          unit: "kg",
          city: "Kolkata",
          minPrice: 65,
          maxPrice: 72,
          avgPrice: 69,
        },
      ];
      await Material.insertMany(defaultRates);
      console.log("🌱 Default material rates registered successfully!");
    }
  } catch (error) {
    console.error("Seeding error:", error.message);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await seedMaterialRates();
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
