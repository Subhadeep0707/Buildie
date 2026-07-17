import { MIX_Ratios } from "../constants/mixRatios";

export const CALCULATECONCRETE = (grade, volume) => {
  if (!grade || !volume || volume <= 0) return null;
  //IS STANDARD FOR DRY VOLUME CALCULATION
  const dryvolume = volume * 1.54;
  //Here we used grade as a dynamic key inside MIX_RATIOS so later it can be changed as userInput
  const ratios = MIX_Ratios[grade];

  if (!ratios) return null;
//Array destructuring 
//const cementRatio = ratios[0];      // 1
//const sandRatio = ratios[1];        // 1.5
//const aggregateRatio = ratios[2];   // 3
  const [cementRatio, sandRatio, aggregateRatio] = ratios;

  const total = cementRatio + sandRatio + aggregateRatio;

  return{
      cement:(cementRatio/total)*dryvolume,
      sand:(sandRatio/total)*dryvolume,
      aggregate:(aggregateRatio/total)*dryvolume,

  };
};
