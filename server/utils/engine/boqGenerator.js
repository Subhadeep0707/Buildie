import { brickCalculation } from "./brickCalc.js";
import { CALCULATECONCRETE } from "./concreteCalc.js";
import { calculateSteel } from "./steelCalc.js";
import { estimateStructuralMembers } from "./structuralCalc.js";
import { calculateEarthwork } from "./earthworkCalc.js";
import { calculateSepticTank } from "./septictankCalc.js";
import { calculateStaircase } from "./stairCalc.js";
import { calculateRainwaterHarvesting } from "./rwhCalc.js";
import { calculateSolarRooftop } from "./solarCalc.js";
import { GLOBAL_RATES } from "../../config/globalRatesConfig.js";
import { calculateLift } from "./liftCalc.js";
import { calculatePumpSystem } from "./pumpCalc.js";
import { calculateFinishing } from "./finishingConfig.js";
import { calculateFirefighting } from "./firefightingCalc.js";
import { calculatePlumbing } from "./plumbingCalc.js";
import { calculateElectricity } from "./electricityCalc.js";

// Helper function to recursively format all numbers to 2 decimal places
const roundObjectValues = (obj, decimals = 2) => {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => roundObjectValues(item, decimals));
  }
  const roundedObj = {};
  for (const key in obj) {
    if (typeof obj[key] === "number") {
      roundedObj[key] = Number(obj[key].toFixed(decimals));
    } else if (typeof obj[key] === "object") {
      roundedObj[key] = roundObjectValues(obj[key], decimals);
    } else {
      roundedObj[key] = obj[key];
    }
  }
  return roundedObj;
};

export const boqGenerator = (grade, volume, elementType = "slab") => {
  if (elementType === "structure") {
    const structuralLayout = estimateStructuralMembers(volume);
    if (!structuralLayout) return null;
    return roundObjectValues(structuralLayout);
  }

  if (elementType === "wall") {
    const bricks = brickCalculation(volume);
    if (!bricks) return null;
    return roundObjectValues({ ...bricks });
  }

  const concrete = CALCULATECONCRETE(grade, volume);
  const steel = calculateSteel(volume, elementType);

  if (!concrete || !steel) return null;

  return roundObjectValues({
    ...concrete,
    ...steel,
  });
};

export const generateProjectEstimate = (projectData) => {
  const {
    totalArea,
    concreteGrade,
    slabVolume = 0,
    wallVolume = 0,
    columnVolume = 0,
    beamVolume = 0,
    foundationInput,
    septicUserCount,
    staircaseInput,
    rwhInput,
    solarInput,
    liftInput,
    pumpInput,
    finishingInput,
    firefightingInput,
    plumbingInput,
    electricityInput,
  } = projectData;

  const breakdown = {
    structuralLayout: totalArea
      ? boqGenerator(null, totalArea, "structure")
      : null,
    slabs: slabVolume ? boqGenerator(concreteGrade, slabVolume, "slab") : null,
    walls: wallVolume ? boqGenerator(null, wallVolume, "wall") : null,
    columns: columnVolume
      ? boqGenerator(concreteGrade, columnVolume, "column")
      : null,
    beams: beamVolume ? boqGenerator(concreteGrade, beamVolume, "beam") : null,
    earthwork: foundationInput ? calculateEarthwork(foundationInput) : null,
    septicTank: septicUserCount ? calculateSepticTank(septicUserCount) : null,
    staircase: staircaseInput ? calculateStaircase(staircaseInput) : null,

 
    // checking for the input object, If it is null, it skips calculation entirely.

    rainwaterHarvesting: rwhInput
      ? calculateRainwaterHarvesting({ ...rwhInput, totalArea })
      : null,

    solarRooftop: solarInput
      ? calculateSolarRooftop({
          ...solarInput,
          roofAreaSqM: totalArea ? totalArea * 0.4 : 0,
        })
      : null,

    liftSystem: liftInput ? calculateLift(liftInput) : null,

    pumpSystem: pumpInput ? calculatePumpSystem(pumpInput, projectData) : null,

    finishingDetails: finishingInput
      ? calculateFinishing(finishingInput, projectData)
      : null,

    firefightingSystem: firefightingInput
      ? calculateFirefighting({
          totalAreaSqM: totalArea,
          ...firefightingInput,
        })
      : null,

    plumbingSystem: plumbingInput ? calculatePlumbing(plumbingInput) : null,

    electricalSystem: electricityInput
      ? calculateElectricity({
          totalAreaSqM: totalArea,
          ...electricityInput,
        })
      : null,
  };

  const grandTotals = {
    cementBags: 0,
    sand: 0,
    aggregate: 0,
    steelKg: 0,
    totalBricks: 0,
    totalEarthworkM3: 0,
  };

  ["slabs", "walls", "columns", "beams"].forEach((key) => {
    if (breakdown[key]) {
      grandTotals.cementBags +=
        breakdown[key].cementBags || breakdown[key].cement || 0;
      grandTotals.sand += breakdown[key].sand || 0;
      grandTotals.aggregate += breakdown[key].aggregate || 0;
      grandTotals.steelKg += breakdown[key].steelKg || 0;
      grandTotals.totalBricks +=
        breakdown[key].totalBricks || breakdown[key].bricks || 0;
    }
  });

  if (breakdown.septicTank && breakdown.septicTank.materialsRequired) {
    grandTotals.cementBags +=
      breakdown.septicTank.materialsRequired.estimatedCementBags || 0;
    grandTotals.totalBricks +=
      breakdown.septicTank.materialsRequired.estimatedBricks || 0;
    grandTotals.steelKg +=
      breakdown.septicTank.materialsRequired.estimatedSteelKg || 0;
  }

  if (breakdown.earthwork) {
    grandTotals.totalEarthworkM3 += breakdown.earthwork.earthVolumeM3 || 0;
  }

  if (breakdown.staircase && breakdown.staircase.materialsRequired) {
    grandTotals.cementBags +=
      breakdown.staircase.materialsRequired.cementBags || 0;
    grandTotals.sand += breakdown.staircase.materialsRequired.sand || 0;
    grandTotals.aggregate +=
      breakdown.staircase.materialsRequired.aggregate || 0;
    grandTotals.steelKg += breakdown.staircase.materialsRequired.steelKg || 0;
  }

  if (
    breakdown.rainwaterHarvesting &&
    breakdown.rainwaterHarvesting.materialsRequired
  ) {
    grandTotals.cementBags +=
      breakdown.rainwaterHarvesting.materialsRequired.estimatedCementBags || 0;
    grandTotals.totalBricks +=
      breakdown.rainwaterHarvesting.materialsRequired.estimatedBricks || 0;
    grandTotals.steelKg +=
      breakdown.rainwaterHarvesting.materialsRequired.estimatedSteelKg || 0;
  }

  if (breakdown.finishingDetails && breakdown.finishingDetails.materials) {
    grandTotals.cementBags +=
      breakdown.finishingDetails.materials.plasterCementBags || 0;
    grandTotals.sand +=
      breakdown.finishingDetails.materials.plasterSandVolumeM3 || 0;
  }

  const cementCost =
    grandTotals.cementBags * GLOBAL_RATES.materials.cementBagINR;
  const steelCost = grandTotals.steelKg * GLOBAL_RATES.materials.steelKgINR;
  const brickCost =
    grandTotals.totalBricks * GLOBAL_RATES.materials.brickPieceINR;
  const sandCost =
    grandTotals.sand * (GLOBAL_RATES.materials.sandUnitINR || 40);
  const aggregateCost =
    grandTotals.aggregate * (GLOBAL_RATES.materials.aggregateUnitINR || 45);

  const solarCost = breakdown.solarRooftop?.solarSystemTotalCost || 0;
  const rwhCost = breakdown.rainwaterHarvesting?.rwhSystemTotalCost || 0;
  const septicTankCost = breakdown.septicTank?.septicTankTotalCost || 0;
  const staircaseCost = breakdown.staircase?.staircaseTotalCost || 0;
  const earthworkCost = breakdown.earthwork?.totalExcavationCost || 0;
  const liftCost = breakdown.liftSystem?.liftSystemTotalCost || 0;
  const pumpCost = breakdown.pumpSystem?.costs?.totalSystemCost || 0;
  const finishingCost =
    breakdown.finishingDetails?.costs?.finishingSystemTotalCost || 0;
  const firefightingCost =
    breakdown.firefightingSystem?.totalEstimatedCost || 0;
  const plumbingCost = breakdown.plumbingSystem?.plumbingSystemTotalCost || 0;
  const electricityCost =
    breakdown.electricalSystem?.electricalSystemTotalCost || 0;

  const calculatedTotalCost =
    cementCost +
    steelCost +
    brickCost +
    sandCost +
    aggregateCost +
    solarCost +
    rwhCost +
    septicTankCost +
    staircaseCost +
    earthworkCost +
    liftCost +
    pumpCost +
    finishingCost +
    firefightingCost +
    plumbingCost +
    electricityCost;

  const totalCosts = {
    cementCost,
    steelCost,
    brickCost,
    sandCost,
    aggregateCost,
    earthworkCost,
    septicTankCost,
    staircaseCost,
    rwhCost,
    solarCost,
    liftCost,
    pumpCost,
    finishingCost,
    firefightingCost,
    plumbingCost,
    electricityCost,
    totalCost: calculatedTotalCost,
  };

  return roundObjectValues({
    breakdown,
    grandTotals,
    totalCosts,
  });
};
