import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLiftInputs,
  resetLiftInputs,
  toggleLiftIncluded,
} from "../store/slices/liftSlice";
import { useProjectSettings } from "../store/slices/useProjectSettings";

const LiftInputForm = () => {
  const dispatch = useDispatch();
  const liftData = useSelector((state) => state.lift);
  const { units } = useProjectSettings(); 

  const blockInvalidChars = (e) => {
    if (["-", "+", "e", "E"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== "" && Number(value) < 0) return;

    dispatch(
      updateLiftInputs({
        [name]:
          name === "capacityPassengers" || name === "stops"
            ? value === ""
              ? ""
              : Number(value)
            : value,
      }),
    );
  };

  const handleToggle = (e) => {
    dispatch(toggleLiftIncluded(e.target.checked));
  };

  return (
    <div className="bg-slate-800 p-4 rounded-lg text-white">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">Lift System Configuration</h3>
          <label className="flex items-center space-x-2 text-sm font-medium text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={liftData.isIncluded || false}
              onChange={handleToggle}
              className="w-4 h-4 cursor-pointer"
            />
            <span>Include Lift</span>
          </label>
        </div>
        <button
          type="button"
          onClick={() => dispatch(resetLiftInputs())}
          className="text-xs text-red-400 hover:underline cursor-pointer"
        >
          Reset Form
        </button>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <label className="block mb-1 text-slate-300">
            Passengers Capacity
          </label>
          <input
            type="number"
            min="1"
            onKeyDown={blockInvalidChars}
            name="capacityPassengers"
            value={liftData.capacityPassengers}
            onChange={handleChange}
            disabled={!liftData.isIncluded}
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-300">
            Number of Stops / Floors ({units.length} reference)
          </label>
          <input
            type="number"
            min="1"
            onKeyDown={blockInvalidChars}
            name="stops"
            value={liftData.stops}
            onChange={handleChange}
            disabled={!liftData.isIncluded}
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-300">
            Compliance Standard
          </label>
          <select
            name="standardKey"
            value={liftData.standardKey}
            onChange={handleChange}
            disabled={!liftData.isIncluded}
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="IS_14665">IS 14665 (Indian Standard)</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-slate-300">Lift Type</label>
          <select
            name="typeKey"
            value={liftData.typeKey}
            onChange={handleChange}
            disabled={!liftData.isIncluded}
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="passengerMRL">Passenger MRL</option>
            <option value="goodsElevator">Goods Elevator</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default LiftInputForm;
