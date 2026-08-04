export const EXCAVATION_STANDARDS = {
  IS_1200_PART_1: {
    codeName: "IS 1200 (Part 1)",
    description: "Method of measurement of building and civil engineering works - Earthwork",
    foundationTypes: {
      isolatedFooting: {
        description: "Square or rectangular pad footings for columns",
        // Extra working space margin on each side in meters (typically 0.5m for formwork/workers)
        workingMarginMeters: 0.5,
        defaultDepthMeters: 1.5,
      },
      wallStripFooting: {
        description: "Continuous strip footing for load-bearing walls",
        standardWidthMeters: 0.8,
        defaultDepthMeters: 1.0,
      }
    }
  }
};