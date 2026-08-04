export const SOLAR_STANDARDS = {
  MNRE_ROOFTOP: {
    codeName: "MNRE Solar Rooftop Guidelines",
    description: "Ministry of New and Renewable Energy - Grid Connected Solar PV Systems",
    verificationUrl: "https://mnre.gov.in/",
    parameters: {
      areaPerKwSqM: 10,             // ~10 sq.m of shadow-free roof area required per 1 kW system
      avgDailyGenerationUnitsPerKw: 4.5, // Average generation of 4.5 kWh (units) per kW per day
      defaultSystemCapacityKw: 3.0,  // Standard default residential setup (3 kW)
    }
  }
};