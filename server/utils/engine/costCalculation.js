export const calculateCost = (data, rates) => {
  // Match key to data.cementBags and remove the BAGS_PER_M3 multiplier
  const cementCost = (data.cementBags || 0) * (rates.cementPerBag || 0);
  
  const steelCost = (data.steelKg || 0) * (rates.steelPerKg || 0);
  
  // Match key to data.totalBricks
  const brickCost = (data.totalBricks || 0) * (rates.brickPerUnit || 0);
  
  const sandCost = (data.sand || 0) * (rates.sandPerM3 || 0);
  
  const aggregateCost = (data.aggregate || 0) * (rates.aggregatePerM3 || 0);

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