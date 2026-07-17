import { Pie, PieChart, Cell, Tooltip } from "recharts";

const CostChart = ({ result }) => {
  if (!result) return null;

  const data = [
    {
      name: "Cement",
      value: result.cementCost,
      color: "#3b82f6",
    },

    {
      name: "Steel",
      value: result.steelCost,
      color: "#ef4444",
    },

    {
      name: "Bricks",
      value: result.brickCost,
      color: "#22c55e",
    },

    {
      name: "Sand",
      value: result.sandCost,
      color: "#f59e0b",
    },

    {
      name: "Aggregate",
      value: result.aggregateCost,
      color: "#8b5cf6",
    },
  ];

  const total = result.totalCost || 1;

  const dataWithPercentage = data.map((item) => ({
    ...item,
    percent: ((item.value / total) * 100).toFixed(1),
  }));

  return (
    <div
      className="
        flex
        flex-col
        md:flex-row
        gap-6
        items-center
        justify-center
        p-4
      "
    >
      {/* Chart */}
      <PieChart width={240} height={240}>
        <Pie data={data} dataKey="value" outerRadius={90}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "none",
            borderRadius: "10px",
            color: "white",
          }}
        />
      </PieChart>

      {/* Legend */}
      <div className="space-y-3">
        {dataWithPercentage.map((item) => (
          <div
            key={item.name}
            className="
                flex
                items-center
                gap-3
              "
          >
            {/* Color Dot */}
            <div
              className="
                  w-4
                  h-4
                  rounded-full
                "
              style={{
                backgroundColor: item.color,
              }}
            />

            {/* Label */}
            <div className="flex flex-col">
              <span className="font-medium dark:text-white">{item.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.percent}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CostChart;
