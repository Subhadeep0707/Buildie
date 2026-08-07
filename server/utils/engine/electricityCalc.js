import { ELECTRICITY_STANDARDS } from "../../config/electricityConfig.js";

export const calculateElectricity = (inputData = {}) => {
  const standard = ELECTRICITY_STANDARDS["IS_4648"];
  const totalAreaSqM = Number(inputData.totalAreaSqM) || 0;
  const bedrooms = Number(inputData.bedrooms) || 0;
  const livingRooms = Number(inputData.livingRooms) || 0;
  const kitchens = Number(inputData.kitchens) || 0;
  const bathrooms = Number(inputData.bathrooms) || 0;

  let totalPoints = 0;

  //points: prioritize room counts; fall back to area-based calculation
  if (bedrooms > 0 || livingRooms > 0 || kitchens > 0 || bathrooms > 0) {
    totalPoints =
      bedrooms * standard.pointNorms.bedroom.defaultPoints +
      livingRooms * standard.pointNorms.livingRoom.defaultPoints +
      kitchens * standard.pointNorms.kitchen.defaultPoints +
      bathrooms * standard.pointNorms.bathroom.defaultPoints;
  } else if (totalAreaSqM > 0) {
    totalPoints = Math.ceil(
      totalAreaSqM * standard.areaBasedNorms.pointsPerSqMeter,
    );
  }

  // If no points are generated,return null to skip this module
  if (totalPoints === 0) return null;

  //Quantity estimations
  const wireMeters = Math.ceil(
    totalPoints * standard.wiringEstimations.wireMetersPerPoint,
  );
  const conduitMeters = Math.ceil(
    wireMeters * standard.wiringEstimations.conduitRatioToWire,
  );

  //Financial calculations using default rates
  const wireCost = wireMeters * standard.defaultRatesINR.wirePerMeter;
  const conduitCost = conduitMeters * standard.defaultRatesINR.conduitPerMeter;
  const switchSocketCost =
    totalPoints * standard.defaultRatesINR.switchSocketPointINR;
  const dbMcbCost = standard.defaultRatesINR.dbAndMcbAvgINR;
  const laborCost = totalPoints * standard.defaultRatesINR.laborCostPerPoint;

  const electricalSystemTotalCost =
    wireCost + conduitCost + switchSocketCost + dbMcbCost + laborCost;

  return {
    totalPoints,
    materialsRequired: {
      electricalWireMeters: wireMeters,
      conduitPipeMeters: conduitMeters,
    },
    costs: {
      wireCost,
      conduitCost,
      switchSocketCost,
      dbMcbCost,
      laborCost,
    },
    electricalSystemTotalCost,
  };
};
