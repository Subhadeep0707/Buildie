import { RWH_STANDARDS } from "../../config/rwhConfig.js";
import { GLOBAL_RATES } from "../../config/globalRatesConfig.js";

const roundValues = (obj, decimals = 2) => {
  const rounded = {};
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      rounded[key] = roundValues(obj[key], decimals);
    } else if (typeof obj[key] === "number") {
      rounded[key] = Number(obj[key].toFixed(decimals));
    } else {
      rounded[key] = obj[key];
    }
  }
  return rounded;
};

export const calculateRainwaterHarvesting = (rwhData = {}) => {
  const {
    roofAreaSqM,
    totalArea = 0, // Accept total project area from payload
    annualRainfallMm = RWH_STANDARDS.IS_15797.parameters
      .defaultAnnualRainfallMm,
  } = rwhData;

  // Dynamic fallback: If roofAreaSqM is not provided, estimate it as roughly 40% of total built-up area (or default to 100 sqM)
  const effectiveRoofArea =
    roofAreaSqM || (totalArea > 0 ? totalArea * 0.4 : 100);

  const config = RWH_STANDARDS.IS_15797.parameters;

  //Annual Harvestable Water Volume
  const annualWaterVolumeM3 =
    effectiveRoofArea *
    (annualRainfallMm / 1000) *
    config.runoffCoefficientConcrete;
  const annualWaterVolumeLitres = annualWaterVolumeM3 * 1000;

  //Recommended Storage Tank Capacity (Litres)
  const recommendedTankCapacityLitres = annualWaterVolumeLitres * 0.1;
  const tankCapacityM3 = recommendedTankCapacityLitres / 1000;

  //Tank Construction Material Estimation
  const tankDepthMeters = 2.0;
  const tankAreaSqM = tankCapacityM3 / tankDepthMeters;
  const tankPerimeterMeters = 4 * Math.sqrt(tankAreaSqM);

  const wallAreaSqM = tankPerimeterMeters * tankDepthMeters;
  const estimatedBricks = Math.round(wallAreaSqM * 500);
  const estimatedCementBags = Math.round(
    estimatedBricks * 0.002 + tankCapacityM3 * 2.0,
  );
  const estimatedSteelKg = Math.round(tankCapacityM3 * 15);

  //Cost Estimation using GLOBAL_RATES
  const rwhSystemTotalCost =
    estimatedBricks * GLOBAL_RATES.materials.brickPieceINR +
    estimatedCementBags * GLOBAL_RATES.materials.cementBagINR +
    estimatedSteelKg * GLOBAL_RATES.materials.steelKgINR +
    tankAreaSqM * GLOBAL_RATES.shutteringFormwork.slabSqM;

  return roundValues({
    designStandard: RWH_STANDARDS.IS_15797.codeName,
    catchmentAreaSqM: effectiveRoofArea,
    annualRainfallMm,
    annualHarvestableLitres: annualWaterVolumeLitres,
    recommendedTankCapacityLitres,
    tankDimensions: {
      depthMeters: tankDepthMeters,
      approxAreaSqM: tankAreaSqM,
    },
    materialsRequired: {
      estimatedBricks,
      estimatedCementBags,
      estimatedSteelKg,
    },
    rwhSystemTotalCost,
  });
};
