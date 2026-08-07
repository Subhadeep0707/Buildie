export const PLUMBING_STANDARDS = {
  IS_1172: {
    codeName: "IS 1172",
    description:
      "Code of Basic Requirements for Water Supply, Drainage and Sanitation",
    residentialFixtures: {
      description: "Standard fixture points for residential dwellings",
      bathroom: {
        defaultPoints: 5,
        notes: "Shower, Tap, Wash Basin, WC, Health Faucet",
      },
      kitchen: {
        defaultPoints: 3,
        notes: "Sink tap, RO/Filter point, Utility tap",
      },
      balcony: {
        defaultPoints: 1,
        notes: "Washing machine or cleaning tap",
      },
    },
    pipingEstimations: {
      description: "Average piping length required per fixture point in meters",
      waterSupplyCPVC: {
        metersPerPoint: 4.5,
      },
      drainagePVC: {
        metersPerPoint: 3.5,
      },
    },
    defaultRatesINR: {
      description:
        "Default financial rates in INR for plumbing materials and labor",
      cpvcPipePerMeter: 120,
      pvcDrainPipePerMeter: 180,
      fixtureFittingAvg: 1500, // Average cost of taps/valves/fittings per point
      laborCostPerPoint: 800,
    },
  },
};
