export const calculateSteel = (volume, type = "slab") => {
  if (!volume || volume <= 0) return null;
  const percentages = {
    slab: 0.01,
    beam: 0.02,
    beam: 0.025,
  };
  //steel density in m3
  const density = 7850;

  //Dynamic object key lookup slab,beam or column
  //obj[key] get value using variable
  const percentage = percentages[type];

  if (!percentage) return null;

  const steelWeight = volume * density * percentage;
  //for dynamic value later we are  returning a structured object with named properties
  return {
    steelKg: steelWeight,
  };
};
