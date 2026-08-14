import { generateProjectEstimate } from "../utils/engine/boqGenerator.js";

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
    const {
      totalArea,
      concreteGrade,
      slabVolume,
      wallVolume,
      columnVolume,
      beamVolume,
      floorsInput,
      detailedRoomsInput, //  Destructure detailed rooms
    } = req.body;

    // Updated validation to allow either macro floors or detailed rooms as valid entry parameters
    if (
      !totalArea &&
      !slabVolume &&
      !wallVolume &&
      !columnVolume &&
      !beamVolume &&
      (!floorsInput || floorsInput.length === 0) &&
      (!detailedRoomsInput || detailedRoomsInput.length === 0)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide at least one project parameter (e.g., totalArea, floorsInput, detailedRoomsInput) to calculate.",
      });
    }

    const estimateData = generateProjectEstimate(req.body);

    if (!estimateData) {
      return res.status(400).json({
        success: false,
        message: "Invalid parameters for calculation.",
      });
    }

    const cleanGrandTotals = roundObjectValues(estimateData.grandTotals);
    res.json({
      success: true,
      message: "Project estimate generated successfully",
      data: {
        breakdown: estimateData.breakdown,
        grandTotals: cleanGrandTotals,
        totalCosts: estimateData.totalCosts,
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
