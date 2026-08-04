export const SEPTIC_STANDARDS = {
  IS_2470_PART_1: {
    codeName: "IS 2470 (Part 1)",
    description: "Code of practice for installation of septic tanks: Design criteria",
    parameters: {
      capacityPerUserLitres: 110,
      defaultDepthMeters: 1.5,
      lengthToWidthRatio: 2.0,
      // Threshold where IS 2470 recommends multi-chamber tanks (e.g., more than 20 users)
      multiChamberThreshold: 20
    }
  }
};