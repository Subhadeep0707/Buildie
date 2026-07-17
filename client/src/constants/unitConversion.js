export const convertVolume = (value, unitSystem) => {
  if (unitSystem === "imperial") {
    return value * 35.3147;
  }
  return value;
};

export const convertArea = (value, unitSystem) => {
  if (unitSystem === "imperial") {
    return value * 10.7639;
  }
  return value;
};

export const convertWeight = (value, unitSystem) => {
  if (unitSystem === "imperial") {
    return value * 2.20462;
  }
  return value;
};
