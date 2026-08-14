import { useSelector } from "react-redux";
import { unitConfig } from "../../constants/unitConfig";
import { currencySymbols } from "../../constants/currencyRates";

export const useProjectSettings = () => {
  // Grab the global settings from Redux
  const { unitSystem = "metric", currency = "INR" } = useSelector(
    (state) => state.settings
  );

  // Derive the correct labels based on the state
  const currentUnits = unitConfig[unitSystem] || unitConfig.metric;
  const currencySymbol = currencySymbols[currency] || "₹";

  return {
    unitSystem,
    currency,
    units: currentUnits,
    symbol: currencySymbol,
  };
};