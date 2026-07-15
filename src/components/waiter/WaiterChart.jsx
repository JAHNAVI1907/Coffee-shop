// src/components/waiter/WaiterStatsChart.jsx
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register Chart.js components for Doughnut chart
ChartJS.register(ArcElement, Title, Tooltip, Legend);

function WaiterStatsChart({ stats }) {
  const data = {
    labels: ["Tables Assigned", "Orders Completed", "Feedback", "Avg Serve Time"],
    datasets: [
      {
        label: "Waiter Stats",
        data: [
          stats.tablesAssigned,
          stats.ordersServed,
          stats.feedbackScore,
          stats.avgServeTime,
        ],
        backgroundColor: ["#556b2f", "#8fbc8f", "#2e8b57", "#3cb371"], // earthy tones
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Waiter Dashboard Metrics (Donut)" },
    },
    cutout: "65%", // medium ring thickness
  };

  return (
    <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default WaiterStatsChart;
