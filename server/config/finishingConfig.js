export const FINISHING_STANDARDS = {
  IS_1661: {
    title: "Code of Practice for Application of Cement Plaster Finishes",
    sourceUrl: "https://law.resource.org/pub/in/bis/S03/is.1661.1972.pdf",
    specs: {
      defaultThicknessM: 0.012, // 12mm standard interior plaster
      dryVolumeMultiplier: 1.33,
      mixRatio: { cement: 1, sand: 5 }, // 1:5 ratio
      laborRatePerSqM: 120, // INR
    }
  },
  IS_2395: {
    title: "Code of Practice for Painting Concrete, Masonry and Plaster Surfaces",
    sourceUrl: "https://law.resource.org/pub/in/bis/S03/is.2395.1.1994.pdf",
    specs: {
      coverageSqMPerLiter: 10, // 2 coats
      primerCoverageSqMPerLiter: 12,
      paintRatePerLiter: 350, // INR
      primerRatePerLiter: 150, // INR
      laborRatePerSqM: 80, // INR
    }
  },
  IS_1443: {
    title: "Code of Practice for Laying and Finishing of Flooring Tiles",
    sourceUrl: "https://law.resource.org/pub/in/bis/S03/is.1443.1972.pdf",
    specs: {
      defaultTileLengthM: 0.6, // 600mm
      defaultTileWidthM: 0.6,  // 600mm
      wastageFactor: 1.05, // 5% wastage
      tileRatePerSqM: 600, // INR
      mortarThicknessM: 0.02, // 20mm mortar bed
      laborRatePerSqM: 300, // INR
    }
  }
};