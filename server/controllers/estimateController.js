import { generateProjectEstimate } from "../utils/engine/boqGenerator.js";

// Helper function to format numbers to 2 decimal places
const roundObjectValues = (obj, decimals = 2) => {
  const roundedObj = {};
  for (const key in obj) {
    if (typeof obj[key] === "number") {
      roundedObj[key] = Number(obj[key].toFixed(decimals));
    } else {
      roundedObj[key] = obj[key];
    }
  }
  return roundedObj;
};

const createEstimate = (req, res) => {
  try {
    // Extract the full project payload from the request body
    const {
      totalArea,
      concreteGrade,
      slabVolume,
      wallVolume,
      columnVolume,
      beamVolume,
    } = req.body;

    // Base validation: Ensure at least one calculation parameter is provided
    if (
      !totalArea &&
      !slabVolume &&
      !wallVolume &&
      !columnVolume &&
      !beamVolume
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide at least one project parameter (e.g., totalArea, slabVolume) to calculate.",
      });
    }

    // Engine Execution
    // Passing the entire body to the engine, which handles the breakdown and aggregation internally
    const estimateData = generateProjectEstimate(req.body);

    if (!estimateData) {
      return res.status(400).json({
        success: false,
        message: "Invalid parameters for calculation.",
      });
    }
    // Formatting cleanup for grandTotals
    const cleanGrandTotals = roundObjectValues(estimateData.grandTotals);

    // We pass the engine's totalCosts directly, ensuring modules like Solar/RWH aren't dropped
    res.json({
      success: true,
      message: "Project estimate generated successfully",
      data: {
        breakdown: estimateData.breakdown,
        grandTotals: cleanGrandTotals,
        totalCosts: estimateData.totalCosts, // Passing the engine's exact cost output
      },
    });
  } catch (error) {
    console.error("Estimation Engine Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during calculation.",
    });
  }
};

export default createEstimate;
