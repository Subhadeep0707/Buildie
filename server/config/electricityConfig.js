export const ELECTRICITY_STANDARDS = {
  IS_4648: {
    codeName: "IS 4648",
    description: "Guide for Electrical Layout in Residential Buildings",
    pointNorms: {
      description:
        "Recommended number of electrical points (light, fan, socket) per room type",
      bedroom: {
        defaultPoints: 8,
      },
      livingRoom: {
        defaultPoints: 12,
      },
      kitchen: {
        defaultPoints: 6,
      },
      bathroom: {
        defaultPoints: 3,
      },
    },
    areaBasedNorms: {
      description:
        "Estimation based on total built-up area when exact room count is missing",
      pointsPerSqMeter: 0.25,
    },
    wiringEstimations: {
      description: "Average wiring and conduit required per electrical point",
      wireMetersPerPoint: 8,
      conduitRatioToWire: 0.6, // Shared conduit runs mean less conduit than wire
    },
    defaultRatesINR: {
      description:
        "Default financial rates in INR for electrical materials and labor",
      wirePerMeter: 25, // Modular FR Copper Wire
      conduitPerMeter: 35, // PVC Conduit pipe
      switchSocketPointINR: 250, // Modular switch, socket & internal box
      dbAndMcbAvgINR: 4500, // Distribution Board + MCBs
      laborCostPerPoint: 350,
    },
  },
};
