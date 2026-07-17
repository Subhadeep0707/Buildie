import { calculateSteel } from "./steelCalc";
import { CALCULATECONCRETE } from "./concreteCalc";
import { brickCalculation } from "./brickCalc";

export const boqGenerator = (grade, volume) => {
  const concrete = CALCULATECONCRETE(grade, volume);
  const steel = calculateSteel(volume, "slab");
  const bricks = brickCalculation(volume);

  if (!concrete || !steel || !bricks) {
    return null;
  }

  return {
    ...concrete,
    ...steel,
    ...bricks,
  };
};
