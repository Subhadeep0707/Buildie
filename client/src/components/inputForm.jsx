import { useSelector } from "react-redux";
import { unitConfig } from "../constants/unitConfig";

const InputForm = ({ onCalculate, mode, setMode, formData, setFormData }) => {
  const unitSystem = useSelector((state) => state.settings.unitSystem);
  const units = unitConfig[unitSystem];

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white
  dark:bg-gray-800
  p-4
  rounded-xl
  shadow-md
  space-y-3"
    >
      {/* Mode */}
      <div className="flex gap-2">
        {["volume", "area"].map((m) => (
          <button
            type="button"
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1 rounded text-sm capitalize ${
              mode === m
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Grade */}
      <select
        value={formData.grade}
        onChange={(e) =>
          setFormData({
            ...formData,
            grade: e.target.value,
          })
        }
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
        <option value="M15">M15</option>
        <option value="M20">M20</option>
        <option value="M25">M25</option>
      </select>

      {/* Inputs */}
      {mode === "volume" ? (
        <input
          type="number"
          value={formData.volume}
          placeholder={`Volume (${units.volume})`}
          onChange={(e) =>
            setFormData({
              ...formData,
              volume: e.target.value,
            })
          }
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
        />
      ) : (
        <>
          {/* Length */}
          <input
            type="number"
            value={formData.length}
            placeholder={`Length (${units.length})`}
            onChange={(e) =>
              setFormData({
                ...formData,
                length: e.target.value,
              })
            }
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
          />

          {/* Width */}
          <input
            type="number"
            value={formData.width}
            placeholder={`Width (${units.length})`}
            onChange={(e) =>
              setFormData({
                ...formData,
                width: e.target.value,
              })
            }
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
          />

          {/* Wall Height */}
          <input
            type="number"
            value={formData.wallHeight}
            placeholder={`Wall Height (${units.length})`}
            onChange={(e) =>
              setFormData({
                ...formData,
                wallHeight: e.target.value,
              })
            }
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
          />

          {/* Slab Thickness */}
          <input
            type="number"
            value={formData.slabThickness}
            placeholder={`Slab Thickness (${units.length})`}
            onChange={(e) =>
              setFormData({
                ...formData,
                slabThickness: e.target.value,
              })
            }
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
          />

          {/* Wall Thickness */}
          <input
            type="number"
            value={formData.wallThickness}
            placeholder={`Wall Thickness (${units.length})`}
            onChange={(e) =>
              setFormData({
                ...formData,
                wallThickness: e.target.value,
              })
            }
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
          />
        </>
      )}

      {/* Button */}
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        Calculate
      </button>
    </form>
  );
};

export default InputForm;
