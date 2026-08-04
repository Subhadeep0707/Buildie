import { STAIRCASE_STANDARDS } from "../../config/staircaseConfig.js";
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

export const calculateStaircase = (stairData) => {
  const {
    floorHeightM = 3.0,
    flightWidthM = 1.2,
    flightLengthM = 4.0,
    numberOfFloors = 1,
  } = stairData;

  const config = STAIRCASE_STANDARDS.IS_456_STAIRS.parameters;

  //Calculate Single Floor Staircase Volume (Two flights per floor)
  const inclinedLengthM = Math.sqrt(
    Math.pow(floorHeightM, 2) + Math.pow(flightLengthM, 2),
  );
  const waistSlabVolumeM3 =
    inclinedLengthM * flightWidthM * config.wasteSlabThicknessM;

  const numSteps = Math.ceil((floorHeightM * 1000) / config.maxRiserMm);
  const singleStepVolumeM3 =
    0.5 *
    (config.maxRiserMm / 1000) *
    (config.minTreadMm / 1000) *
    flightWidthM;
  const totalStepsVolumeM3 = singleStepVolumeM3 * numSteps;

  const singleFloorConcreteM3 = (waistSlabVolumeM3 + totalStepsVolumeM3) * 2;

  //Scale across total floors
  const totalConcreteM3 = singleFloorConcreteM3 * numberOfFloors;

  //Material Approximations
  const cementBags = Math.round(totalConcreteM3 * 5.8);
  const sand = totalConcreteM3 * 0.45;
  const aggregate = totalConcreteM3 * 0.9;
  const steelKg = Math.round(totalConcreteM3 * 2500 * config.steelPercentage);

  //Formwork and Labor Costs using GLOBAL_RATES
  const shutteringAreaSqM =
    inclinedLengthM * flightWidthM * 2 * numberOfFloors * 2.2;
  const shutteringCost =
    shutteringAreaSqM * GLOBAL_RATES.shutteringFormwork.staircaseSqM;
  const laborCost = totalConcreteM3 * GLOBAL_RATES.labor.generalCastingM3;

  //Total Cost Calculation using GLOBAL_RATES
  const materialCost =
    cementBags * GLOBAL_RATES.materials.cementBagINR +
    steelKg * GLOBAL_RATES.materials.steelKgINR;

  const staircaseTotalCost = materialCost + shutteringCost + laborCost;

  return roundValues({
    designStandard: STAIRCASE_STANDARDS.IS_456_STAIRS.codeName,
    storeys: numberOfFloors,
    totalConcreteM3,
    shutteringAreaSqM,
    materialsRequired: {
      cementBags,
      sand,
      aggregate,
      steelKg,
    },
    staircaseTotalCost,
  });
};
