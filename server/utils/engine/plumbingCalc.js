import { PLUMBING_STANDARDS } from "../../config/plumbingConfig.js";

export const calculatePlumbing = (inputData = {}) => {
  const standard = PLUMBING_STANDARDS["IS_1172"];
  const bathrooms = Number(inputData.bathrooms) || 0;
  const kitchens = Number(inputData.kitchens) || 0;
  const balconies = Number(inputData.balconies) || 0;

  //total fixture points based on the IS 1172 standard
  const totalPoints =
    bathrooms * standard.residentialFixtures.bathroom.defaultPoints +
    kitchens * standard.residentialFixtures.kitchen.defaultPoints +
    balconies * standard.residentialFixtures.balcony.defaultPoints;

  if (totalPoints === 0) return null;

  //Quantity estimations
  const cpvcMeters = Math.ceil(
    totalPoints * standard.pipingEstimations.waterSupplyCPVC.metersPerPoint,
  );
  const pvcMeters = Math.ceil(
    totalPoints * standard.pipingEstimations.drainagePVC.metersPerPoint,
  );

  //Financial calculations using default rates
  const cpvcPipeCost = cpvcMeters * standard.defaultRatesINR.cpvcPipePerMeter;
  const pvcDrainCost =
    pvcMeters * standard.defaultRatesINR.pvcDrainPipePerMeter;
  const fittingsCost = totalPoints * standard.defaultRatesINR.fixtureFittingAvg;
  const laborCost = totalPoints * standard.defaultRatesINR.laborCostPerPoint;
  const plumbingSystemTotalCost =
    cpvcPipeCost + pvcDrainCost + fittingsCost + laborCost;

  return {
    totalPoints,
    materialsRequired: {
      cpvcPipeMeters: cpvcMeters,
      pvcDrainMeters: pvcMeters,
    },
    costs: {
      cpvcPipeCost,
      pvcDrainCost,
      fittingsCost,
      laborCost,
    },
    plumbingSystemTotalCost,
  };
};
