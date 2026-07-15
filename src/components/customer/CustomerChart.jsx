// src/components/customer/CustomerStatsChart.jsx
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

function CustomerStatsChart({ stats }) {
  const data = {
    labels: ["Orders Assigned", "Bookings Made", "Amount Spent", "Loyalty Points"],
    datasets: [
      {
        label: "Customer Stats",
        data: [
          stats.orders,
          stats.bookings,
          stats.amountSpent,
          45
        ],
        backgroundColor: ["#ff7f50", "#ffa07a", "#ff6347", "#ff4500"], // warm tones
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allows custom sizing
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Customer Dashboard Metrics (Donut)" },
    },
    cutout: "65%", // medium ring thickness
  };

  return (
    <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default CustomerStatsChart;
