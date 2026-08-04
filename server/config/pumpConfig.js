export const PUMP_STANDARDS = {
  // Electric Monobloc Pumps for Clear, Cold Water
  IS_9079: {
    description: "IS 9079: Monobloc Surface Pump",
    types: {
      residentialTransfer: { baseRatePerHP: 3500, minHP: 1, efficiency: 0.6 },
      commercialTransfer: { baseRatePerHP: 4500, minHP: 2, efficiency: 0.7 },
    },
    accessoriesBaseCost: 4500, // Basic valves, PVC piping, standard panel
  },
  // Submersible Pumpsets for Clear, Cold Water
  IS_8034: {
    description: "IS 8034: Borewell Submersible Pump",
    types: {
      standardBorewell: { baseRatePerHP: 4800, minHP: 1, efficiency: 0.55 },
      deepBorewell: { baseRatePerHP: 5800, minHP: 3, efficiency: 0.65 },
    },
    accessoriesBaseCost: 8500, // Submersible cables, ropes, advanced starter panel
  },
  // Civil Standard for Pump Room / Enclosure
  PUMP_ROOM_CIVIL: {
    constructionRatePerSqM: 12500, // Civil structural base cost
    waterproofingRatePerSqM: 450, // Sump/floor waterproofing
  },
};
