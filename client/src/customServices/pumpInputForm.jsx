import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePumpInputs,
  resetPumpInputs,
  togglePumpIncluded,
} from "../store/slices/pumpSlice";

const PumpInputForm = () => {
  const dispatch = useDispatch();
  const pumpData = useSelector((state) => state.pump) || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      updatePumpInputs({
        [name]:
          name === "pumpRunningHours" ||
          name === "explicitHeadMeters" ||
          name === "explicitDemandLiters" ||
          name === "explicitRoomAreaSqM"
            ? value === ""
              ? ""
              : Number(value)
            : value,
      }),
    );
  };

  const handleToggle = (e) => {
    dispatch(togglePumpIncluded(e.target.checked));
  };

  return (
    <div className="bg-slate-800 p-4 rounded-lg text-white">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">Pump System Configuration</h3>
          <label className="flex items-center space-x-2 text-sm font-medium text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={pumpData.isIncluded || false}
              onChange={handleToggle}
              className="w-4 h-4 cursor-pointer"
            />
            <span>Include Pump</span>
          </label>
        </div>
        <button
          type="button"
          onClick={() => dispatch(resetPumpInputs())}
          className="text-xs text-red-400 hover:underline"
        >
          Reset Form
        </button>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <label className="block mb-1 text-slate-300">
            Compliance Standard
          </label>
          <select
            name="standardKey"
            value={pumpData.standardKey || "IS_9079"}
            onChange={handleChange}
            disabled={!pumpData.isIncluded}
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="IS_9079">IS 9079 (Indian Standard)</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-slate-300">Pump Type</label>
          <select
            name="typeKey"
            value={pumpData.typeKey || "residentialTransfer"}
            onChange={handleChange}
            disabled={!pumpData.isIncluded}
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="residentialTransfer">
              Residential Water Transfer
            </option>
            <option value="commercialSubmersible">
              Commercial Submersible
            </option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-slate-300">
            Running Hours / Day
          </label>
          <input
            type="number"
            name="pumpRunningHours"
            value={pumpData.pumpRunningHours || 2}
            onChange={handleChange}
            disabled={!pumpData.isIncluded}
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            min="0.5"
            step="0.5"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-300">
            Head Distance in Meters (Optional - Inferred if Blank)
          </label>
          <input
            type="number"
            name="explicitHeadMeters"
            placeholder="Auto-calculated from floors"
            value={pumpData.explicitHeadMeters || ""}
            onChange={handleChange}
            disabled={!pumpData.isIncluded}
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-300">
            Daily Demand in Liters (Optional - Inferred if Blank)
          </label>
          <input
            type="number"
            name="explicitDemandLiters"
            placeholder="Auto-calculated from users"
            value={pumpData.explicitDemandLiters || ""}
            onChange={handleChange}
            disabled={!pumpData.isIncluded}
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default PumpInputForm;
