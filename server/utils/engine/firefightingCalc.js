// server/utils/engine/firefightingCalc.js
import { FIREFIGHTING_STANDARDS } from "../../config/firefightingConfig.js";
import { GLOBAL_RATES } from "../../config/globalRatesConfig.js";

export const calculateFirefighting = (inputs) => {
  const {
    totalAreaSqM = 500,
    numberOfFloors = 4,
    buildingHeightMeters = 15,
    hazardLevel = "LIGHT_HAZARD", // LIGHT_HAZARD | ORDINARY_HAZARD | HIGH_HAZARD
    includeSprinklers = true,
    includeHydrants = true,
  } = inputs;

  const hazardConfig =
    FIREFIGHTING_STANDARDS.NBC_2016_PART_4.hazardClassifications[hazardLevel] ||
    FIREFIGHTING_STANDARDS.NBC_2016_PART_4.hazardClassifications.LIGHT_HAZARD;

  const defaults = FIREFIGHTING_STANDARDS.NBC_2016_PART_4.defaultParameters;

  //Sprinkler Calculations
  let totalSprinklers = 0;
  let sprinklerPipeLengthM = 0;
  if (includeSprinklers) {
    totalSprinklers = Math.ceil(
      totalAreaSqM / defaults.sprinklerCoveragePerHeadSqM,
    );
    // Rough estimate: ~3.5 meters of distribution piping per sprinkler head
    sprinklerPipeLengthM = Math.ceil(
      totalSprinklers * 3.5 * defaults.pipeSizingAllowanceFactor,
    );
  }

  //Riser & Hydrant Pipe Calculations
  let mainRiserLengthM = 0;
  let externalHydrants = 0;
  let hoseReelCabinets = 0;

  if (includeHydrants) {
    mainRiserLengthM = Math.ceil(
      (buildingHeightMeters + 5) * defaults.pipeSizingAllowanceFactor,
    );
    // Perimeter approx = 4 * sqrt(area per floor)
    const floorArea = totalAreaSqM / numberOfFloors;
    const estimatedPerimeter = 4 * Math.sqrt(floorArea);
    externalHydrants = Math.max(
      2,
      Math.ceil(estimatedPerimeter / defaults.hydrantSpacingMeters),
    );
    hoseReelCabinets = numberOfFloors * defaults.hoseReelPerFloor;
  }

  //Tank & Pump Specs
  const undergroundTankCapacityLiters = hazardConfig.minWaterStorageLiters;
  const mainPumpLpm = hazardConfig.mainPumpCapacityLpm;
  const jockeyPumpLpm = hazardConfig.jockeyPumpCapacityLpm;

  //Cost Estimation
  const rates = GLOBAL_RATES?.firefighting || {
    sprinklerHead: 350, // INR per unit
    pipePerMeter: 850, // INR per meter (MS Heavy Class)
    hydrantCabinet: 18000, // INR per cabinet assembly
    mainPumpSet: 250000, // INR for electric main pump + panel
    dieselPumpSet: 220000, // INR standby diesel engine pump
    jockeyPumpSet: 45000, // INR jockey pump
  };

  const sprinklerCost = totalSprinklers * rates.sprinklerHead;
  const pipingCost =
    (sprinklerPipeLengthM + mainRiserLengthM) * rates.pipePerMeter;
  const hydrantCost = hoseReelCabinets * rates.hydrantCabinet;
  const pumpRoomCost =
    rates.mainPumpSet + rates.dieselPumpSet + rates.jockeyPumpSet;

  const totalCost = sprinklerCost + pipingCost + hydrantCost + pumpRoomCost;

  return {
    summary: {
      hazardType: hazardConfig.type,
      totalSprinklers,
      sprinklerPipeLengthM,
      mainRiserLengthM,
      externalHydrants,
      hoseReelCabinets,
      waterTankCapacityLiters: undergroundTankCapacityLiters,
      pumps: {
        mainElectricLpm: mainPumpLpm,
        standbyDieselLpm: mainPumpLpm,
        jockeyLpm: jockeyPumpLpm,
      },
    },
    billOfQuantities: [
      {
        item: "Pendant / Upright Sprinkler Heads",
        quantity: totalSprinklers,
        unit: "Nos",
        rate: rates.sprinklerHead,
        amount: sprinklerCost,
      },
      {
        item: "MS Heavy Class Piping (Riser & Branch)",
        quantity: sprinklerPipeLengthM + mainRiserLengthM,
        unit: "Meters",
        rate: rates.pipePerMeter,
        amount: pipingCost,
      },
      {
        item: "Hose Reel & Hydrant Hose Cabinets",
        quantity: hoseReelCabinets,
        unit: "Sets",
        rate: rates.hydrantCabinet,
        amount: hydrantCost,
      },
      {
        item: "Fire Pump House Setup (Electric + Diesel Standby + Jockey)",
        quantity: 1,
        unit: "Job",
        rate: pumpRoomCost,
        amount: pumpRoomCost,
      },
    ],
    totalEstimatedCost: Math.round(totalCost),
  };
};
