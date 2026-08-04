// config/isCodesConfig.js
export const IS_STANDARDS = {
  IS_456_2000: {
    codeName: "IS 456 : 2000",
    description: "Plain and Reinforced Concrete - Code of Practice",
    verificationUrl: "https://law.resource.org/pub/in/bis/S03/is.456.2000.pdf",
    structural: {
      // Optimal spacing in meters for standard residential/commercial (Clause 23.2 deflection control)
      optimalColumnSpacingMeters: 4.5,
    },
    materials: {
      densitySteelKgPerM3: 7850,
      densityConcreteKgPerM3: 2400,
    },
  },
};
