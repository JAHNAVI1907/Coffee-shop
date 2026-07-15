// src/components/admin/AdminStatsChart.jsx
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

function AdminStatsChart({ stats }) {
  const data = {
    labels: ["Customers", "Chefs", "Waiters", "Bookings"],
    datasets: [
      {
        label: "Admin Stats",
        data: [
          stats.customers,
          stats.chefs,
          stats.waiters,
          stats.bookings,
        ],
        backgroundColor: ["#6b532f", "#aa9042", "#6d4e1c", "#64532e"], // earthy tones
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
      title: { display: true, text: "Admin Dashboard Metrics (Donut)" },
    },
    cutout: "65%", // medium ring thickness
  };

  return (
    <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default AdminStatsChart;
