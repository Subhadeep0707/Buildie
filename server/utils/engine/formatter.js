
export const currencyRates = { INR: 1, USD: 97, EUR: 111, GBP: 128 };
export const currencySymbols = { INR: "₹", USD: "$", EUR: "€", GBP: "£" };

export const unitConfig = {
  metric: { length: "m", area: "m²", volume: "m³", weight: "kg" },
  imperial: { length: "ft", area: "sq.ft", volume: "cu.ft", weight: "lbs" },
};

export const formatProjectData = (
  rawBoqData,
  unitSystem = "metric",
  currency = "INR",
) => {
  const rate = currencyRates[currency] || 1;
  const isImperial = unitSystem === "imperial";

  // Helper functions for raw number conversion
  const convertCurrency = (val) => (currency === "INR" ? val : val / rate);
  const convertVolume = (val) => (isImperial ? val * 35.3147 : val);
  const convertArea = (val) => (isImperial ? val * 10.7639 : val);
  const convertWeight = (val) => (isImperial ? val * 2.20462 : val);

  // Clone the raw data to avoid mutating the original
  const formattedData = JSON.parse(JSON.stringify(rawBoqData));

  //  converting a specific section 
  if (formattedData.totals) {
    formattedData.totals.totalCost = convertCurrency(
      formattedData.totals.totalCost,
    );
    formattedData.totals.totalConcreteVolume = convertVolume(
      formattedData.totals.totalConcreteVolume,
    );
    formattedData.totals.totalPlasterArea = convertArea(
      formattedData.totals.totalPlasterArea,
    );
    formattedData.totals.totalSteelWeight = convertWeight(
      formattedData.totals.totalSteelWeight,
    );
  }

  // Attach the symbols to the frontend 
  return {
    ...formattedData,
    meta: {
      currencySymbol: currencySymbols[currency] || "₹",
      units: unitConfig[unitSystem],
    },
  };
};
