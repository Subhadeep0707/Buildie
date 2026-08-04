import { LIFT_STANDARDS } from "../../config/liftConfig.js";
export const calculateLift = (liftInput) => {
  const { 
    capacityPassengers = 6, 
    stops = 4, 
    // Now expecting keys that map tostandards object
    standardKey = "IS_14665", 
    typeKey = "passengerMRL" 
  } = liftInput;

  // Safely fetch the standard and lift type from the new object structure
  const standardObj = LIFT_STANDARDS[standardKey]; //IS Code Specification
  const liftConfig = standardObj?.liftTypes[typeKey]; // Based Is Code specification which type of lift 

  if (!liftConfig) {
    throw new Error("Invalid lift standard or type provided.");
  }

  // Cost calculation
  let capacityMultiplier = 1.0;
  if (capacityPassengers > liftConfig.standardCapacity) {
    const extra = capacityPassengers - liftConfig.standardCapacity;
    capacityMultiplier += (extra * liftConfig.extraPassengerMultiplier);
  }

  const calculatedCost = (liftConfig.baseSystemCost + (stops * liftConfig.costPerStop)) * capacityMultiplier;

  return {
    compliance: {
      codeName: standardObj.codeName,
      description: standardObj.description,
    },
    liftDetails: {
      description: liftConfig.description,
      minimumPitDepthMeters: liftConfig.minimumPitDepthMeters,
      minimumHeadroomMeters: liftConfig.minimumHeadroomMeters
    },
    liftSystemTotalCost: calculatedCost
  };
};