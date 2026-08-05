export const FIREFIGHTING_STANDARDS = {
  NBC_2016_PART_4: {
    codeName: "NBC 2016 Part 4 - Fire and Life Safety",
    description: "National Building Code guidelines for fire protection, pump capacity, and water storage requirements",
    verificationUrl: "https://www.bis.gov.in/",
    hazardClassifications: {
      LIGHT_HAZARD: {
        type: "Residential / Offices",
        sprinklerDensityLpmSqM: 2.25, // Litres/min per m²
        minWaterStorageLiters: 50000,
        mainPumpCapacityLpm: 1620,    // ~450 GPM
        jockeyPumpCapacityLpm: 180,
      },
      ORDINARY_HAZARD: {
        type: "Commercial / Shopping Malls / Hotels",
        sprinklerDensityLpmSqM: 5.0,
        minWaterStorageLiters: 100000,
        mainPumpCapacityLpm: 2280,    // ~600 GPM
        jockeyPumpCapacityLpm: 180,
      },
      HIGH_HAZARD: {
        type: "Industrial / Chemical Storage / Warehouses",
        sprinklerDensityLpmSqM: 10.0,
        minWaterStorageLiters: 200000,
        mainPumpCapacityLpm: 2850,    // ~750 GPM
        jockeyPumpCapacityLpm: 300,
      }
    },
    defaultParameters: {
      sprinklerCoveragePerHeadSqM: 12.0, // Avg 12 sq.m per sprinkler head
      pipeSizingAllowanceFactor: 1.15,  // 15% wastage/fitting factor for piping
      hydrantSpacingMeters: 30.0,       // 1 external hydrant per 30m perimeter
      hoseReelPerFloor: 2,              // Default hose reels per floor
    }
  }
};