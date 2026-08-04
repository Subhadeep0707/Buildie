import { FINISHING_STANDARDS } from "../../config/finishingConfig.js";
export const calculateFinishing = (finishingInput, projectData) => {
  const { totalArea, wallVolume = 0 } = projectData;

  //Extract standard keys from input, fallback to defaults
  const {
    plasterStandardKey = "IS_1661",
    paintStandardKey = "IS_2395",
    tileStandardKey = "IS_1443",
    customTileLength,
    customTileWidth,
  } = finishingInput || {};

  //Fetch standard configurations safely
  const plasterConfig =
    FINISHING_STANDARDS[plasterStandardKey]?.specs ||
    FINISHING_STANDARDS.IS_1661.specs;
  const paintConfig =
    FINISHING_STANDARDS[paintStandardKey]?.specs ||
    FINISHING_STANDARDS.IS_2395.specs;
  const tileConfig =
    FINISHING_STANDARDS[tileStandardKey]?.specs ||
    FINISHING_STANDARDS.IS_1443.specs;

  //DYNAMIC AREA INFERENCE 
  const wallSurfaceAreaOneSide = wallVolume / 0.23;
  const totalPlasterAreaSqM = wallSurfaceAreaOneSide * 2 + totalArea;

  //PLASTERING CALCULATION (IS 1661)
  const plasterWetVolume =
    totalPlasterAreaSqM * plasterConfig.defaultThicknessM;
  const plasterDryVolume = plasterWetVolume * plasterConfig.dryVolumeMultiplier;
  const mixTotal = plasterConfig.mixRatio.cement + plasterConfig.mixRatio.sand;
  const plasterCementVolume =
    plasterDryVolume * (plasterConfig.mixRatio.cement / mixTotal);
  const plasterSandVolume =
    plasterDryVolume * (plasterConfig.mixRatio.sand / mixTotal);

  const plasterCementBags = Math.ceil(plasterCementVolume / 0.0347);
  const plasterLaborCost = totalPlasterAreaSqM * plasterConfig.laborRatePerSqM;

  //PAINTING CALCULATION (IS 2395)
  const primerRequiredLiters =
    totalPlasterAreaSqM / paintConfig.primerCoverageSqMPerLiter;
  const paintRequiredLiters =
    totalPlasterAreaSqM / paintConfig.coverageSqMPerLiter;

  const paintingMaterialCost =
    primerRequiredLiters * paintConfig.primerRatePerLiter +
    paintRequiredLiters * paintConfig.paintRatePerLiter;
  const paintingLaborCost = totalPlasterAreaSqM * paintConfig.laborRatePerSqM;

  //TILING CALCULATION (IS 1443)
  const tileLength = customTileLength || tileConfig.defaultTileLengthM;
  const tileWidth = customTileWidth || tileConfig.defaultTileWidthM;
  const singleTileArea = tileLength * tileWidth;

  const requiredTiles = Math.ceil(
    (totalArea / singleTileArea) * tileConfig.wastageFactor,
  );

  const tilingMaterialCost = totalArea * tileConfig.tileRatePerSqM;
  const tilingLaborCost = totalArea * tileConfig.laborRatePerSqM;

  // Return formatted object with compliance URLs
  return {
    compliance: {
      plasterStandard: {
        code: plasterStandardKey,
        title: FINISHING_STANDARDS[plasterStandardKey]?.title,
        sourceUrl: FINISHING_STANDARDS[plasterStandardKey]?.sourceUrl,
      },
      paintStandard: {
        code: paintStandardKey,
        title: FINISHING_STANDARDS[paintStandardKey]?.title,
        sourceUrl: FINISHING_STANDARDS[paintStandardKey]?.sourceUrl,
      },
      tilingStandard: {
        code: tileStandardKey,
        title: FINISHING_STANDARDS[tileStandardKey]?.title,
        sourceUrl: FINISHING_STANDARDS[tileStandardKey]?.sourceUrl,
      },
    },
    materials: {
      totalPlasterAreaSqM: Number(totalPlasterAreaSqM.toFixed(2)),
      plasterCementBags,
      plasterSandVolumeM3: Number(plasterSandVolume.toFixed(2)),
      primerLiters: Number(primerRequiredLiters.toFixed(2)),
      paintLiters: Number(paintRequiredLiters.toFixed(2)),
      totalTilesRequired: requiredTiles,
    },
    costs: {
      plasterLaborCost,
      paintingTotalCost: paintingMaterialCost + paintingLaborCost,
      tilingTotalCost: tilingMaterialCost + tilingLaborCost,
      finishingSystemTotalCost:
        plasterLaborCost +
        paintingMaterialCost +
        paintingLaborCost +
        tilingMaterialCost +
        tilingLaborCost,
    },
  };
};
