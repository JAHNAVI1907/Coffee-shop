// src/components/chef/ChefDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import "../customer/Customer.css";
import ChefStatsChart from "./ChefChart";
import bgImage from "../../assets/dashboard1.jpg"; // ✅ your background image

function ChefDashboard() {
  const navigate = useNavigate();
  const [chefName, setChefName] = useState("");
  const [stats, setStats] = useState({
    ordersAssigned: 0,
    ordersCompleted: 0,
    avgPrepTime: 0,
    dishesToday: 0,
  });

  useEffect(() => {
    const storedName = localStorage.getItem("chefName");
    const storedId = localStorage.getItem("chefId");
    if (storedName && storedId) {
      setChefName(storedName);

      fetch(`http://localhost:8080/api/chef/orders/${storedId}/stats`)
        .then((res) => res.json())
        .then((data) => setStats(data))
        .catch((err) => console.error("Failed to fetch chef stats:", err));
    } else {
      navigate("/chef-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("chefName");
    localStorage.removeItem("chefId");
    navigate("/");
  };

  return (
    <>
      {/* === BACKGROUND LAYER WITH LITTLE BLUR === */}
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          filter: "blur(3px)",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 0,
        }}
      ></div>

      {/* === FOREGROUND CONTENT === */}
      <div className="customer-layout" style={{ position: "relative", zIndex: 1 }}>
        <aside className="customer-sidebar">
          <div className="sidebar-header">
            <h3>Coffee Coop</h3>
          </div>
          <nav className="sidebar-nav">
            <div className="sidebar-item" onClick={() => navigate("/chef-dashboard")}>
              <img src="/images/dashboard-icon.jpg" alt="dashboard" />
              <span>Dashboard</span>
            </div>
            <div className="sidebar-item" onClick={() => navigate("/chef-profile")}>
              <img src="/images/profile-icon.png" alt="Profile" />
              <span>Profile</span>
            </div>
            <div className="sidebar-item" onClick={() => navigate("/chef-orders")}>
              <img src="/images/view-icon.png" alt="Orders" />
              <span>View Assigned Orders</span>
            </div>
          </nav>

          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </aside>

        <main className="customer-main">
          <div className="welcome-section">
            <h1>Welcome, {chefName}</h1>
            <p className="welcome-para">
              Welcome back, Chef! You're in charge of crafting delicious meals for our guests.
            </p>

            {/* === STATS CARDS === */}
            <div className="stats-container">
              <div className="stat-card">
                <h3>🍽️ Orders Assigned</h3>
                <p>{stats.ordersAssigned}</p>
              </div>
              <div className="stat-card">
                <h3>✅ Orders Completed</h3>
                <p>{stats.ordersCompleted}</p>
              </div>
              <div className="stat-card">
                <h3>⏱ Avg Prep Time</h3>
                <p>{stats.avgPrepTime} mins</p>
              </div>
              <div className="stat-card">
                <h3>🔥 Dishes Today</h3>
                <p>{stats.dishesToday}</p>
              </div>
            </div>

            {/* === DONUT CHART === */}
            <ChefStatsChart stats={stats} />
          </div>
        </main>
      </div>
    </>
  );
}

export default ChefDashboard;
