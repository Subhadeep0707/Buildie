import { SEPTIC_STANDARDS } from "../../config/septictankConfig.js";
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

export const calculateSepticTank = (userCount) => {
  if (!userCount || userCount <= 0) return null;

  const config = SEPTIC_STANDARDS.IS_2470_PART_1.parameters;

  // Calculate total liquid capacity
  const totalCapacityLitres = userCount * config.capacityPerUserLitres;
  const totalCapacityM3 = totalCapacityLitres / 1000;

  // Calculate dimensions
  const depthMeters = config.defaultDepthMeters;
  const areaSqM = totalCapacityM3 / depthMeters;

  const widthMeters = Math.sqrt(areaSqM / config.lengthToWidthRatio);
  const lengthMeters = widthMeters * config.lengthToWidthRatio;

  // Determine Chamber Type based on IS 2470
  const chamberType =
    userCount > config.multiChamberThreshold
      ? "Two-Chamber Tank"
      : "Single-Chamber Tank";

  // Material estimation
  const wallAreaSqM = (lengthMeters + widthMeters) * 2 * depthMeters;
  const estimatedBricks = Math.round(wallAreaSqM * 500);
  const estimatedCementBags = Math.round(
    estimatedBricks * 0.002 + totalCapacityM3 * 2.5,
  );
  const estimatedSteelKg = userCount > config.multiChamberThreshold ? 150 : 75;

  // Use GLOBAL_RATES for total cost calculation
  const septicTankTotalCost =
    estimatedBricks * GLOBAL_RATES.materials.brickPieceINR +
    estimatedCementBags * GLOBAL_RATES.materials.cementBagINR +
    estimatedSteelKg * GLOBAL_RATES.materials.steelKgINR;

  return roundValues({
    designStandard: SEPTIC_STANDARDS.IS_2470_PART_1.codeName,
    occupants: userCount,
    chamberType,
    capacityLitres: totalCapacityLitres,
    dimensions: {
      lengthMeters,
      widthMeters,
      depthMeters,
    },
    materialsRequired: {
      estimatedBricks,
      estimatedCementBags,
      estimatedSteelKg,
    },
    septicTankTotalCost,
  });
};
