const BAGS_PER_M3 = 28.8; // standard 

export const calculateCost = (data, rates) => {
  const cementCost =
    data.cement * BAGS_PER_M3 * rates.cementPerBag;

  const steelCost = data.steelKg * rates.steelPerKg;
  const brickCost = data.bricks * rates.brickPerUnit;
  const sandCost = data.sand * rates.sandPerM3;
  const aggregateCost = data.aggregate * rates.aggregatePerM3;

  const totalCost =
    cementCost + steelCost + brickCost + sandCost + aggregateCost;

  return {
    cementCost,
    steelCost,
    brickCost,
    sandCost,
    aggregateCost,
    totalCost,
  };
};