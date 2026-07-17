export const brickCalculation = (volume) => {
  if (!volume || volume <= 0) return null;

  const brickvolume = 0.002; // m³ (with mortar)

  const numberOfbricks = volume / brickvolume;

  return {
    bricks: Math.ceil(numberOfbricks),
  };
};
