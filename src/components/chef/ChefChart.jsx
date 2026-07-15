// src/components/chef/ChefStatsChart.jsx
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

function ChefStatsChart({ stats }) {
  const data = {
    labels: ["Orders Assigned", "Orders Completed", "Avg Prep Time", "Dishes Today"],
    datasets: [
      {
        label: "Chef Stats",
        data: [
          stats.ordersAssigned,
          stats.ordersCompleted,
          stats.avgPrepTime,
          stats.dishesToday,
        ],
        backgroundColor: ["#6f4e37", "#a0522d", "#deb887", "#8b4513"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // ✅ allows custom sizing
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Chef Dashboard Metrics (Donut)" },
    },
    cutout: "65%", // ✅ medium ring thickness
  };

  return (
    <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default ChefStatsChart;
