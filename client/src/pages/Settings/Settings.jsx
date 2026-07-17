import { useDispatch, useSelector } from "react-redux";
import { regionRates } from "../../constants/regionRates";
import {
  setCurrency,
  setUnitSystem,
  setTheme,
  setRegion,
  setDefaultConcreteGrade,
  updateRates,
} from "../../store/slices/settingsSlice";

const Settings = () => {
  const dispatch = useDispatch();

  const settings = useSelector((state) => state.settings);

  const handleRateChange = (e) => {
    dispatch(
      updateRates({
        [e.target.name]: Number(e.target.value),
      }),
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold mb-6 dark:text-white">Settings</h1>

      {/* Currency */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded shadow">
        <label className="block mb-2 dark:text-gray-200">Currency</label>

        <select
          value={settings.currency}
          onChange={(e) => dispatch(setCurrency(e.target.value))}
          className="
  border
  p-2
  rounded
  w-full
  bg-white
  dark:bg-gray-700
  dark:text-white
  dark:border-gray-600
"
        >
          <option value="INR">INR ₹</option>
          <option value="USD">USD $</option>
          <option value="EUR">EUR €</option>
          <option value="GBP">GBP £</option>
        </select>
      </div>

      {/* Unit System */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded shadow">
        <label className="block mb-2 dark:text-gray-200">Unit System</label>
        <select
          value={settings.unitSystem}
          onChange={(e) => dispatch(setUnitSystem(e.target.value))}
          className="
          border
          p-2
          rounded
          w-full
         bg-white
  dark:bg-gray-700
  dark:text-white
  dark:border-gray-600
"
        >
          <option value="metric">Metric</option>
          <option value="imperial">Imperial</option>
        </select>
      </div>

      {/* Theme */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded shadow">
        <label className="block mb-2 dark:text-gray-200">Theme</label>

        <select
          value={settings.theme}
          onChange={(e) => dispatch(setTheme(e.target.value))}
          className="
  border
  p-2
  rounded
  w-full
  bg-white
  dark:bg-gray-700
  dark:text-white
  dark:border-gray-600
"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* Region */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded shadow">
        <label className="block mb-2 dark:text-gray-200">Region</label>
        <select
          value={settings.region}
          onChange={(e) => dispatch(setRegion(e.target.value))}
          className="
      w-full
      border
      p-2
      rounded
      bg-white
      dark:bg-gray-700
      dark:text-white
      dark:border-gray-600
    "
        >
          {Object.keys(regionRates).map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* Default Concrete Grade */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded shadow">
        <label className="block mb-2 dark:text-gray-200">
          Default Concrete Grade
        </label>

        <select
          value={settings.defaultConcreteGrade}
          onChange={(e) => dispatch(setDefaultConcreteGrade(e.target.value))}
          className="
  border
  p-2
  rounded
  w-full
  bg-white
  dark:bg-gray-700
  dark:text-white
  dark:border-gray-600
"
        >
          <option value="M15">M15</option>
          <option value="M20">M20</option>
          <option value="M25">M25</option>
          <option value="M30">M30</option>
        </select>
      </div>

      {/* Material Rates */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded shadow">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Material Rates
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="cementPerBag"
            value={settings.rates.cementPerBag}
            onChange={handleRateChange}
            placeholder="Cement Rate"
            className="
  border
  p-2
  rounded
  bg-white
  dark:bg-gray-700
  dark:text-white
  dark:border-gray-600
"
          />
          <input
            type="number"
            name="steelPerKg"
            value={settings.rates.steelPerKg}
            onChange={handleRateChange}
            placeholder="Steel Rate"
            className="
  border
  p-2
  rounded
  bg-white
  dark:bg-gray-700
  dark:text-white
  dark:border-gray-600
"
          />
          <input
            type="number"
            name="brickPerUnit"
            value={settings.rates.brickPerUnit}
            onChange={handleRateChange}
            placeholder="Brick Rate"
            className="
  border
  p-2
  rounded
  bg-white
  dark:bg-gray-700
  dark:text-white
  dark:border-gray-600
"
          />
          <input
            type="number"
            name="sandPerM3"
            value={settings.rates.sandPerM3}
            onChange={handleRateChange}
            placeholder="Sand Rate"
            className="
  border
  p-2
  rounded
  bg-white
  dark:bg-gray-700
  dark:text-white
  dark:border-gray-600
"
          />
          <input
            type="number"
            name="aggregatePerM3"
            value={settings.rates.aggregatePerM3}
            onChange={handleRateChange}
            placeholder="Aggregate Rate"
            className="
  border
  p-2
  rounded
  bg-white
  dark:bg-gray-700
  dark:text-white
  dark:border-gray-600
"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
