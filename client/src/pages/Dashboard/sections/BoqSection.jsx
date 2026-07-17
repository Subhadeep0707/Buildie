import { useSelector } from "react-redux";
import {
  currencyRates,
  currencySymbols,
} from "../../../constants/currencyRates";
import { unitConfig } from "../../../constants/unitConfig";
import {
  convertVolume,
  convertArea,
  convertWeight,
} from "../../../constants/unitConversion";

const BoqSection = ({ result }) => {
  // Currency
  const currency = useSelector((state) => state.settings.currency);
  const symbol = currencySymbols[currency];
  const rate = currencyRates[currency];

  // Units
  const unitSystem = useSelector((state) => state.settings.unitSystem);
  const units = unitConfig[unitSystem];
  const itemStyle = "text-black dark:text-white";
  if (!result) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        No project calculation data available.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Quantities */}
      <div
        className="
          bg-green-100
          dark:bg-green-900/30
          border
          border-green-300
          dark:border-green-700
          p-5
          rounded-xl
          shadow
          space-y-3
        "
      >
        <h2 className="text-xl font-semibold dark:text-white">Quantities</h2>

        <div className="space-y-2">
          <p className={itemStyle}>
            Cement: {convertVolume(result.cement, unitSystem)?.toFixed(2)}{" "}
            {units.volume}
          </p>
          <p className={itemStyle}>
            Sand: {convertVolume(result.sand, unitSystem)?.toFixed(2)}{" "}
            {units.volume}
          </p>
          <p className={itemStyle}>
            Aggregate: {convertVolume(result.aggregate, unitSystem)?.toFixed(2)}{" "}
            {units.volume}
          </p>
          <p className={itemStyle}>
            Steel: {convertWeight(result.steelKg, unitSystem)?.toFixed(2)}{" "}
            {units.weight}
          </p>
          <p className={itemStyle}>Bricks: {result.bricks}</p>
          <p className={itemStyle}>
            Plaster: {convertArea(result.plasterArea, unitSystem)?.toFixed(2)}{" "}
            {units.area}
          </p>
        </div>
      </div>

      {/* Cost */}
      <div
        className="
          bg-white
          dark:bg-gray-800
          border
          border-gray-200
          dark:border-gray-700
          p-5
          rounded-xl
          shadow
          space-y-3
        "
      >
        <h2 className="text-xl font-semibold dark:text-white">
          Cost Breakdown
        </h2>

        <div className="space-y-2">
          <p className={itemStyle}>
            Cement: {symbol}
            {(result.cementCost / rate)?.toFixed(2)}
          </p>
          <p className={itemStyle}>
            Steel: {symbol}
            {(result.steelCost / rate)?.toFixed(2)}
          </p>
          <p className={itemStyle}>
            Bricks: {symbol}
            {(result.brickCost / rate)?.toFixed(2)}
          </p>
          <p className={itemStyle}>
            Sand: {symbol}
            {(result.sandCost / rate)?.toFixed(2)}
          </p>
          <p className={itemStyle}>
            Aggregate: {symbol}
            {(result.aggregateCost / rate)?.toFixed(2)}
          </p>
        </div>

        {/* Total */}
        <div
          className="
            pt-3
            border-t
            border-gray-200
            dark:border-gray-700
          "
        >
          <p className="font-bold text-lg text-green-700 dark:text-green-300">
            Total: {symbol}
            {(result.totalCost / rate)?.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BoqSection;
