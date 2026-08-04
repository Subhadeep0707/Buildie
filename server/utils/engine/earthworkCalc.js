import { EXCAVATION_STANDARDS } from "../../config/excavationConfig.js";
import { GLOBAL_RATES } from "../../config/globalRatesConfig.js";

const roundValues = (obj, decimals = 2) => {
  const rounded = {};
  for (const key in obj) {
    if (typeof obj[key] === "number") {
      rounded[key] = Number(obj[key].toFixed(decimals));
    } else {
      rounded[key] = obj[key];
    }
  }
  return rounded;
};

export const calculateEarthwork = (foundationData) => {
  const {
    type = "isolatedFooting",
    numberOfFootings = 1,
    footingLength = 1.5,
    footingWidth = 1.5,
    customDepth = 0,
    stripLengthMeters = 0,
  } = foundationData;

  const standards = EXCAVATION_STANDARDS.IS_1200_PART_1.foundationTypes;
  let earthVolumeM3 = 0;

  if (type === "isolatedFooting") {
    const margin = standards.isolatedFooting.workingMarginMeters;
    const depth =
      customDepth > 0
        ? customDepth
        : standards.isolatedFooting.defaultDepthMeters;

    const totalExcavationLength = footingLength + 2 * margin;
    const totalExcavationWidth = footingWidth + 2 * margin;

    const singleFootingVolume =
      totalExcavationLength * totalExcavationWidth * depth;
    earthVolumeM3 = singleFootingVolume * numberOfFootings;
  } else if (type === "wallStripFooting") {
    const width = standards.wallStripFooting.standardWidthMeters;
    const depth =
      customDepth > 0
        ? customDepth
        : standards.wallStripFooting.defaultDepthMeters;

    earthVolumeM3 = stripLengthMeters * width * depth;
  }

  // Use GLOBAL_RATES for excavation labor cost
  const excavationRatePerM3 = GLOBAL_RATES.labor.excavationM3;
  const totalExcavationCost = earthVolumeM3 * excavationRatePerM3;

  return roundValues({
    foundationType: type,
    earthVolumeM3,
    totalExcavationCost,
  });
};
