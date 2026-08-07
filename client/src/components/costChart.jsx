import { Pie, PieChart, Cell, Tooltip } from "recharts";

const CostChart = ({ result }) => {
  if (!result) return null;

  const costs = result.totalCosts || result;

 
  //  DATA FOR MATERIAL BREAKDOWN

  const materialData = [
    { name: "Cement", value: costs.cementCost || 0, color: "#3b82f6" },
    { name: "Steel", value: costs.steelCost || 0, color: "#ef4444" },
    { name: "Bricks", value: costs.brickCost || 0, color: "#22c55e" },
    { name: "Sand", value: costs.sandCost || 0, color: "#f59e0b" },
    { name: "Aggregate", value: costs.aggregateCost || 0, color: "#8b5cf6" },
  ].filter((item) => item.value > 0);

  const materialTotal =
    materialData.reduce((acc, curr) => acc + curr.value, 0) || 1;
  const materialDataWithPercentage = materialData.map((item) => ({
    ...item,
    percent: ((item.value / materialTotal) * 100).toFixed(1),
  }));

 
  //  DATA FOR CORE VS MEP BREAKDOWN

  const coreCost =
    (costs.cementCost || 0) +
    (costs.steelCost || 0) +
    (costs.brickCost || 0) +
    (costs.sandCost || 0) +
    (costs.aggregateCost || 0) +
    (costs.earthworkCost || 0) +
    (costs.staircaseCost || 0) +
    (costs.finishingCost || 0);

  const mepCost =
    (costs.plumbingCost || 0) +
    (costs.electricityCost || 0) +
    (costs.septicTankCost || 0) +
    (costs.rwhCost || 0) +
    (costs.solarCost || 0) +
    (costs.liftCost || 0) +
    (costs.pumpCost || 0) +
    (costs.firefightingCost || 0);

  const categoryData = [
    { name: "Core Structure", value: coreCost, color: "#0ea5e9" },
    { name: "MEP & Systems", value: mepCost, color: "#10b981" },
  ].filter((item) => item.value > 0);

  const categoryTotal = coreCost + mepCost || 1;
  const categoryDataWithPercentage = categoryData.map((item) => ({
    ...item,
    percent: ((item.value / categoryTotal) * 100).toFixed(1),
  }));


  // Reusable Chart Component
  const RenderChartSection = ({ title, data, legendData }) => (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">
        {title}
      </h3>
      <div className="flex flex-col xl:flex-row gap-4 items-center justify-center w-full">
        {/* Chart  */}
        <PieChart width={140} height={140}>
          <Pie data={data} dataKey="value" outerRadius={65}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontSize: "12px",
            }}
            formatter={(value) => `₹${value.toLocaleString("en-IN")}`}
          />
        </PieChart>

        {/* Legend */}
        <div className="space-y-2 min-w-[120px]">
          {legendData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex flex-col">
                <span className="font-medium text-xs dark:text-white leading-tight">
                  {item.name}
                </span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400">
                  {item.percent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-4 items-start justify-between w-full py-2">
      {/* Chart 1: Core vs MEP */}
      <RenderChartSection
        title="Project Category Split"
        data={categoryData}
        legendData={categoryDataWithPercentage}
      />

      {/* Chart 2: Raw Material Split */}
      <RenderChartSection
        title="Raw Material Breakdown"
        data={materialData}
        legendData={materialDataWithPercentage}
      />
    </div>
  );
};

export default CostChart;
