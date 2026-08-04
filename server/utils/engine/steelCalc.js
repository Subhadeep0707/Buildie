export const calculateSteel = (volume, type = "slab") => {
  if (!volume || volume <= 0) return null;
  
  const percentages = {
    slab: 0.01,
    beam: 0.02,
    column: 0.025, 
  };
  
  const density = 7850; // steel density in m3
  const percentage = percentages[type];

  if (!percentage) return null;

  const steelWeight = volume * density * percentage;
  
  return {
    steelKg: steelWeight,
  };
};