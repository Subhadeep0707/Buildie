import { SOLAR_STANDARDS } from "../../config/solarConfig.js";
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

export const calculateSolarRooftop = (solarData = {}) => {
  const {
    systemCapacityKw,
    roofAreaSqM = 0,
    costPerKwINR = 50000 // Standard benchmark turnkey cost per kW (panels, inverter, mounting, wiring)
  } = solarData;

  const config = SOLAR_STANDARDS.MNRE_ROOFTOP.parameters;

  //Determine System Capacity (kW)
  // If capacity isn't specified, derive it from available roof area, otherwise use default
  let calculatedCapacityKw = systemCapacityKw;
  if (!calculatedCapacityKw) {
    const availableArea = roofAreaSqM > 0 ? roofAreaSqM * 0.4 : 30; // Assume 40% of roof area is usable
    calculatedCapacityKw = Math.max(1, availableArea / config.areaPerKwSqM);
  }

  //Power Generation Estimation
  const dailyGenerationKwh = calculatedCapacityKw * config.avgDailyGenerationUnitsPerKw;
  const annualGenerationKwh = dailyGenerationKwh * 365;

  //Cost Calculation
  const solarSystemTotalCost = calculatedCapacityKw * costPerKwINR;

  return roundValues({
    designStandard: SOLAR_STANDARDS.MNRE_ROOFTOP.codeName,
    systemCapacityKw: calculatedCapacityKw,
    estimatedGeneration: {
      dailyUnitsKwh: dailyGenerationKwh,
      annualUnitsKwh: annualGenerationKwh,
    },
    solarSystemTotalCost,
  });
};