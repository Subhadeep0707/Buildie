export const LIFT_STANDARDS = {
  IS_14665: {
    codeName: "IS 14665",
    description: "Specification for Electric Traction Lifts (Passenger & Goods)",
    liftTypes: {
      passengerMRL: {
        description: "Machine Room-Less electric traction passenger lift",
        baseSystemCost: 500000,
        costPerStop: 75000,
        standardCapacity: 6,
        extraPassengerMultiplier: 0.05,
        // Civil works clearance guidelines
        minimumPitDepthMeters: 1.5,
        minimumHeadroomMeters: 4.2
      },
      passengerMR: {
        description: "Standard Machine Room electric traction passenger lift",
        baseSystemCost: 400000,
        costPerStop: 60000,
        standardCapacity: 6,
        extraPassengerMultiplier: 0.05,
        // Civil works clearance guidelines
        minimumPitDepthMeters: 1.5,
        minimumHeadroomMeters: 4.8
      }
    }
  },
  IS_14671: {
    codeName: "IS 14671",
    description: "Code of Practice for Installation and Maintenance of Hydraulic Lifts",
    liftTypes: {
      homeHydraulic: {
        description: "Hydraulic lift typically used for low-rise or residential buildings",
        baseSystemCost: 450000,
        costPerStop: 50000,
        standardCapacity: 4,
        extraPassengerMultiplier: 0.05,
        // Civil works clearance guidelines
        minimumPitDepthMeters: 1.0,
        minimumHeadroomMeters: 3.5
      }
    }
  }
};