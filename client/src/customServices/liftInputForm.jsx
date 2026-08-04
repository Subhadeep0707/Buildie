import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLiftInputs,
  resetLiftInputs,
} from "../store/slices/liftSlice";

const LiftInputForm = () => {
  const dispatch = useDispatch();
  const liftData = useSelector((state) => state.lift);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      updateLiftInputs({
        [name]:
          name === "capacityPassengers" || name === "stops"
            ? Number(value)
            : value,
      }),
    );
  };

  return (
    <div className="bg-slate-800 p-4 rounded-lg text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Lift System Configuration</h3>
        <button
          type="button"
          onClick={() => dispatch(resetLiftInputs())}
          className="text-xs text-red-400 hover:underline"
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
            name="capacityPassengers"
            value={liftData.capacityPassengers}
            onChange={handleChange}
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none"
            min="1"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-300">
            Number of Stops / Floors
          </label>
          <input
            type="number"
            name="stops"
            value={liftData.stops}
            onChange={handleChange}
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none"
            min="1"
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
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none"
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
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none"
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
