import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import "../customer/Customer.css";
import WaiterStatsChart from "./WaiterChart";
import bgImage from "../../assets/dashboard1.jpg";
import { Link } from "react-router-dom";

function WaiterDashboard() {
  const navigate = useNavigate();
  const [waiterName, setWaiterName] = useState("");
  const [stats, setStats] = useState({
    tablesAssigned: 0,
    ordersServed: 0,
    feedbackScore: 0,
    avgServeTime: 0,
  });

  useEffect(() => {
    const storedName = localStorage.getItem("waiterName");
    const storedId = localStorage.getItem("waiterId");
    if (storedName && storedId) {
      setWaiterName(storedName);

      fetch(`http://localhost:8080/api/waiter/orders/${storedId}/stats`)
        .then((res) => res.json())
        .then((data) => setStats(data))
        .catch((err) => console.error("Failed to fetch waiter stats:", err));
    } else {
      navigate("/waiter-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("waiterName");
    localStorage.removeItem("waiterId");
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
            <p><Link to="/waiter-dashboard" className="back-text">{"Back to dashboard"}</Link></p>
            <h3>Coffee Coop</h3>
          </div>
          <nav className="sidebar-nav">
            <div className="sidebar-item" onClick={() => navigate("/waiter-dashboard")}>
              <img src="/images/dashboard-icon.jpg" alt="dashboard" />
              <span>Dashboard</span>
            </div>
            <div className="sidebar-item" onClick={() => navigate("/waiter-profile")}>
              <img src="/images/profile-icon.png" alt="Profile" />
              <span>Profile</span>
            </div>
            <div className="sidebar-item" onClick={() => navigate("/waiter-tasks")}>
              <img src="/images/view-icon.png" alt="Tables" />
              <span>View Assigned Tables</span>
            </div>
          </nav>
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </aside>

        <main className="customer-main">
          <div className="welcome-section">
            <h1>Welcome, {waiterName}</h1>
            <p className="welcome-para">
              Welcome back, Waiter! Your tables are ready. Serve with a smile and keep the coffee flowing!
            </p>

            <div className="stats-container">
              <div className="stat-card">
                <h3>🪑 Tables Assigned</h3>
                <p>{stats.tablesAssigned}</p>
              </div>
              <div className="stat-card">
                <h3>🍽️ Orders Served</h3>
                <p>{stats.ordersServed}</p>
              </div>
              <div className="stat-card">
                <h3>💬 Feedback Score</h3>
                <p>{stats.feedbackScore}</p>
              </div>
              <div className="stat-card">
                <h3>⏱ Avg Serve Time</h3>
                <p>{stats.avgServeTime} mins</p>
              </div>
            </div>

            {/* === DONUT CHART === */}
            <WaiterStatsChart stats={stats} />
          </div>
        </main>
      </div>
    </>
  );
}

export default WaiterDashboard;
