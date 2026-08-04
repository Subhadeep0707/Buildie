export const RWH_STANDARDS = {
  IS_15797: {
    codeName: "IS 15797 : 2008",
    description: "Roof Top Rainwater Harvesting - Guidelines",
    verificationUrl: "https://law.resource.org/pub/in/bis/S03/is.15797.2008.pdf",
    parameters: {
      runoffCoefficientConcrete: 0.85, // 85% runoff efficiency for concrete roofs
      defaultAnnualRainfallMm: 1200,   // Standard regional average annual rainfall in mm
      storageCapacityFactor: 0.33      // Sizing tank for roughly 1/3 of peak dry spell or seasonal downpour collection
    }
  }
};