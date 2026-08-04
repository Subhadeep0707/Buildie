// utilities/structuralCalc.js
import { IS_STANDARDS } from "../../config/isCodesConfig.js";

export const estimateStructuralMembers = (totalArea) => {
  if (!totalArea || totalArea <= 0) return null;

  //Fetch the standard from our config, eliminating the hardcoded number
  const spacing = IS_STANDARDS.IS_456_2000.structural.optimalColumnSpacingMeters;

  //Approximate a square footprint for the grid
  const dimension = Math.sqrt(totalArea);

  //Calculate grid lines (Math.ceil ensures we cover the full span)
  const gridLinesX = Math.ceil(dimension / spacing) + 1;
  const gridLinesY = Math.ceil(dimension / spacing) + 1;

  //Calculate Quantities
  const totalColumns = gridLinesX * gridLinesY;
  const beamsX = (gridLinesX - 1) * gridLinesY;
  const beamsY = (gridLinesY - 1) * gridLinesX;
  const totalBeamSegments = beamsX + beamsY;

  return {
    sourceCode: IS_STANDARDS.IS_456_2000.codeName,
    verificationUrl: IS_STANDARDS.IS_456_2000.verificationUrl,
    appliedSpacing: spacing,
    totalColumns,
    totalBeamSegments,
  };
};
