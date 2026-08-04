import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePumpInputs, resetPumpInputs } from "../store/slices/pumpSlice";

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

  return (
    <div className="bg-slate-800 p-4 rounded-lg text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Pump System Configuration</h3>
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
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none"
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
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none"
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
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none"
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
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none"
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
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PumpInputForm;
