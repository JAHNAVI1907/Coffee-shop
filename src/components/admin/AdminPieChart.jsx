import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

function AdminPieChart({ stats }) {
  const data = {
    labels: [
      "Customers",
      "Chefs",
      "Waiters",
      "Bookings",
      "Orders",
      "Earnings ₹",
      "Feedback",
      "Report Issues"
    ],
    datasets: [
      {
        data: [
          stats.customers,
          stats.chefs,
          stats.waiters,
          stats.bookings,
          stats.orders,
          stats.earnings,
          stats.feedbackCount,
          stats.issueCount
        ],
        backgroundColor: [
          "#6F4E37", // Customers
          "#A9746E", // Chefs
          "#C19A6B", // Waiters
          "#D2B48C", // Bookings
          "#8B5E3C", // Orders
          "#4B3621", // Earnings
          "#4682B4", // Feedback (blue accent)
          "#DC143C"  // Report Issues (red accent)
        ],
        borderWidth: 1,
        borderColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#333",
          font: {
            size: 14,
            family: "Segoe UI",
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "600px", height: "600px", margin: "2rem auto" }}>
      <Pie data={data} options={options} />
    </div>
  );
}

export default AdminPieChart;
