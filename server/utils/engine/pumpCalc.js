import { PUMP_STANDARDS } from "../../config/pumpConfig.js";
export const calculatePumpSystem = (pumpInput, projectData) => {
  const {
    standardKey = "IS_9079",
    typeKey = "residentialTransfer",
    pumpRunningHours = 2,
    explicitHeadMeters,
    explicitDemandLiters,
    explicitRoomAreaSqM,
  } = pumpInput || {};

  // --- DYNAMIC INFERENCE ---

  //Dynamic Head (H): Infer floors from lift stops, assume 3.2m per floor + 2m for underground sump
  const assumedFloors = projectData.liftInput?.stops || 1;
  const dynamicHead = assumedFloors * 3.2 + 2;
  const totalHeadMeters = explicitHeadMeters || dynamicHead;

  //Dynamic Demand (Q): 135 LPCD (IS 1172 Standard) * number of users
  const assumedUsers = projectData.septicUserCount || 5;
  const dynamicDemand = assumedUsers * 135;
  const dailyDemandLiters = explicitDemandLiters || dynamicDemand;

  //Dynamic Room Area: Default to 4 SqM (2x2) if not specified, scale up if HP is high
  const baseRoomArea = explicitRoomAreaSqM || 4.0;

  // --- MECHANICAL CALCULATION ---

  const standard = PUMP_STANDARDS[standardKey];
  if (!standard) throw new Error(`Invalid Pump Standard Key: ${standardKey}`);
  const pumpConfig = standard.types[typeKey];

  // Flow Rate (LPS)
  const flowRateLPS = dailyDemandLiters / (pumpRunningHours * 3600);

  // Power Calculation
  const gravity = 9.81;
  const powerKW =
    (flowRateLPS * totalHeadMeters * gravity) / (1000 * pumpConfig.efficiency);
  const calculatedHP = powerKW / 0.746;

  let actualHP = Math.ceil(calculatedHP * 2) / 2; // Round to nearest 0.5
  actualHP = actualHP < pumpConfig.minHP ? pumpConfig.minHP : actualHP;

  const pumpCost = actualHP * pumpConfig.baseRatePerHP;
  const mechanicalTotal = pumpCost + standard.accessoriesBaseCost;

  // --- CIVIL CALCULATION ---

  // Scale room size slightly if pump is very large (> 5 HP)
  const finalRoomAreaSqM = actualHP > 5 ? baseRoomArea * 1.5 : baseRoomArea;

  const constructionCost =
    finalRoomAreaSqM * PUMP_STANDARDS.PUMP_ROOM_CIVIL.constructionRatePerSqM;
  const waterproofingCost =
    finalRoomAreaSqM * PUMP_STANDARDS.PUMP_ROOM_CIVIL.waterproofingRatePerSqM;
  const civilTotal = constructionCost + waterproofingCost;

  return {
    systemDetails: {
      standardUsed: standard.description,
      pumpType: typeKey,
      inferredHeadMeters: Number(totalHeadMeters.toFixed(2)),
      inferredDemandLiters: dailyDemandLiters,
      calculatedHP: actualHP,
      flowRateLPS: Number(flowRateLPS.toFixed(2)),
    },
    costs: {
      mechanicalCost: mechanicalTotal,
      civilRoomCost: civilTotal,
      totalSystemCost: mechanicalTotal + civilTotal,
    },
  };
};
