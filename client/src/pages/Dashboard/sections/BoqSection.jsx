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
  // Currency & Units
  const currency = useSelector((state) => state.settings.currency);
  const symbol = currencySymbols[currency];
  const rate = currencyRates[currency];
  const unitSystem = useSelector((state) => state.settings.unitSystem);
  const units = unitConfig[unitSystem];
  const itemStyle =
    "text-black dark:text-gray-300 text-sm flex justify-between";

  if (!result) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        No project calculation data available.
      </div>
    );
  }

  //  handle nested data from the new boqGenerator, or fallback to flat structure
  const quantities = result.grandTotals || result;
  const costs = result.totalCosts || result;

  // Formatting helper to keep JSX clean
  const formatCost = (value) => {
    const val = value || 0;
    return `${symbol} ${(val / rate).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
      {/*  Quantities Column */}
      <div className="bg-green-50 dark:bg-gray-800 border border-green-300 dark:border-green-700 p-5 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-bold dark:text-white border-b border-green-300 dark:border-green-700 pb-2">
          Material Quantities
        </h2>
        <div className="space-y-3">
          <p className={itemStyle}>
            <span>Cement:</span>
            <span className="font-semibold">
              {quantities.cementBags || quantities.cement || 0} Bags
            </span>
          </p>
          <p className={itemStyle}>
            <span>Sand:</span>
            <span className="font-semibold">
              {convertVolume(quantities.sand || 0, unitSystem)?.toFixed(2)}{" "}
              {units.volume}
            </span>
          </p>
          <p className={itemStyle}>
            <span>Aggregate:</span>
            <span className="font-semibold">
              {convertVolume(quantities.aggregate || 0, unitSystem)?.toFixed(2)}{" "}
              {units.volume}
            </span>
          </p>
          <p className={itemStyle}>
            <span>Steel:</span>
            <span className="font-semibold">
              {convertWeight(quantities.steelKg || 0, unitSystem)?.toFixed(2)}{" "}
              {units.weight}
            </span>
          </p>
          <p className={itemStyle}>
            <span>Bricks:</span>
            <span className="font-semibold">
              {quantities.totalBricks || quantities.bricks || 0} pcs
            </span>
          </p>
          {quantities.totalEarthworkM3 > 0 && (
            <p className={itemStyle}>
              <span>Earthwork:</span>
              <span className="font-semibold">
                {convertVolume(
                  quantities.totalEarthworkM3,
                  unitSystem,
                )?.toFixed(2)}{" "}
                {units.volume}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* 2. Core Structure Costs Column */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-bold dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          Core Material Cost
        </h2>
        <div className="space-y-3">
          <p className={itemStyle}>
            <span>Cement:</span>{" "}
            <span className="font-semibold">
              {formatCost(costs.cementCost)}
            </span>
          </p>
          <p className={itemStyle}>
            <span>Steel:</span>{" "}
            <span className="font-semibold">{formatCost(costs.steelCost)}</span>
          </p>
          <p className={itemStyle}>
            <span>Bricks:</span>{" "}
            <span className="font-semibold">{formatCost(costs.brickCost)}</span>
          </p>
          <p className={itemStyle}>
            <span>Sand:</span>{" "}
            <span className="font-semibold">{formatCost(costs.sandCost)}</span>
          </p>
          <p className={itemStyle}>
            <span>Aggregate:</span>{" "}
            <span className="font-semibold">
              {formatCost(costs.aggregateCost)}
            </span>
          </p>

          {costs.earthworkCost > 0 && (
            <p className={itemStyle}>
              <span>Earthwork:</span>{" "}
              <span className="font-semibold">
                {formatCost(costs.earthworkCost)}
              </span>
            </p>
          )}
          {costs.staircaseCost > 0 && (
            <p className={itemStyle}>
              <span>Staircase:</span>{" "}
              <span className="font-semibold">
                {formatCost(costs.staircaseCost)}
              </span>
            </p>
          )}
          {costs.finishingCost > 0 && (
            <p className={itemStyle}>
              <span>Finishing:</span>{" "}
              <span className="font-semibold">
                {formatCost(costs.finishingCost)}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* MEP & Custom Services Costs Column */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-bold dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          MEP & Systems Cost
        </h2>
        <div className="space-y-3">
          {costs.plumbingCost > 0 && (
            <p className={itemStyle}>
              <span>Plumbing:</span>{" "}
              <span className="font-semibold">
                {formatCost(costs.plumbingCost)}
              </span>
            </p>
          )}
          {costs.electricityCost > 0 && (
            <p className={itemStyle}>
              <span>Electrical:</span>{" "}
              <span className="font-semibold">
                {formatCost(costs.electricityCost)}
              </span>
            </p>
          )}
          {costs.septicTankCost > 0 && (
            <p className={itemStyle}>
              <span>Septic Tank:</span>{" "}
              <span className="font-semibold">
                {formatCost(costs.septicTankCost)}
              </span>
            </p>
          )}
          {costs.rwhCost > 0 && (
            <p className={itemStyle}>
              <span>Rain Water (RWH):</span>{" "}
              <span className="font-semibold">{formatCost(costs.rwhCost)}</span>
            </p>
          )}
          {costs.solarCost > 0 && (
            <p className={itemStyle}>
              <span>Solar Rooftop:</span>{" "}
              <span className="font-semibold">
                {formatCost(costs.solarCost)}
              </span>
            </p>
          )}
          {costs.liftCost > 0 && (
            <p className={itemStyle}>
              <span>Lift System:</span>{" "}
              <span className="font-semibold">
                {formatCost(costs.liftCost)}
              </span>
            </p>
          )}
          {costs.pumpCost > 0 && (
            <p className={itemStyle}>
              <span>Pump System:</span>{" "}
              <span className="font-semibold">
                {formatCost(costs.pumpCost)}
              </span>
            </p>
          )}
          {costs.firefightingCost > 0 && (
            <p className={itemStyle}>
              <span>Firefighting:</span>{" "}
              <span className="font-semibold">
                {formatCost(costs.firefightingCost)}
              </span>
            </p>
          )}

          {/* Fallback if no MEP selected */}
          {!costs.plumbingCost &&
            !costs.electricityCost &&
            !costs.septicTankCost && (
              <p className="text-gray-400 text-sm italic">
                No custom systems added to project yet.
              </p>
            )}
        </div>

        {/* Grand Total  */}
        <div className="pt-4 mt-auto border-t border-gray-200 dark:border-gray-700">
          <p className="flex justify-between items-center font-bold text-lg text-blue-700 dark:text-blue-400">
            <span>Grand Total:</span>
            <span>{formatCost(costs.totalCost)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BoqSection;
