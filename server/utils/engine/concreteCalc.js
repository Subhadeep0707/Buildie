import { MIX_Ratios } from "../../constants/mixRatios.js";

export const CALCULATECONCRETE = (grade, volume) => {
  if (!grade || !volume || volume <= 0) return null;
  
  const dryvolume = volume * 1.54;
  const ratios = MIX_Ratios[grade];

  if (!ratios) return null;

  const [cementRatio, sandRatio, aggregateRatio] = ratios;
  const total = cementRatio + sandRatio + aggregateRatio;

  return {
      cement: (cementRatio / total) * dryvolume,
      sand: (sandRatio / total) * dryvolume,
      aggregate: (aggregateRatio / total) * dryvolume,
  };
};