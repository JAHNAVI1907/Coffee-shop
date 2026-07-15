// src/components/customer/CustomerDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import "./Customer.css";
import CustomerStatsChart from "./CustomerChart";
import bgImage from "../../assets/dashboard1.jpg";

function CustomerDashboard() {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [stats, setStats] = useState({
    orders: 0,
    bookings: 0,
    amountSpent: 0,
    feedbackCount: 0,
    issueCount: 0,
  });

  useEffect(() => {
    const storedId = localStorage.getItem("customerId");
    const storedName = localStorage.getItem("customerName");

    if (storedId && storedName) {
      setCustomerName(storedName);

      fetch(`http://localhost:8080/api/customer/${storedId}/stats`)
        .then(async (res) => {
          const text = await res.text();
          try {
            const data = JSON.parse(text);
            setStats(data);
          } catch (err) {
            console.error("Error parsing JSON:", err);
          }
        })
        .catch((err) => console.error("Error fetching stats:", err));
    } else {
      navigate("/customer-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("customerId");
    localStorage.removeItem("customerName");
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
          filter: "blur(3px)",   // ✅ subtle blur
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 0,
        }}
      ></div>

      {/* === FOREGROUND CONTENT === */}
      <div className="customer-layout" style={{ position: "relative", zIndex: 1 }}>
        {/* === SIDEBAR === */}
        <aside className="customer-sidebar">
          <div className="sidebar-header">
            <h3>Coffee Coop</h3>
          </div>

          <nav className="sidebar-nav">
            <div className="sidebar-item" onClick={() => navigate("/customer-dashboard")}>
              <img src="/images/dashboard-icon.jpg" alt="dashboard" />
              <span>Dashboard</span>
            </div>
            <div className="sidebar-item" onClick={() => navigate("/customer-profile")}>
              <img src="/images/profile-icon.png" alt="Profile" />
              <span>Profile</span>
            </div>
            <div className="sidebar-item" onClick={() => navigate("/customer-booking")}>
              <img src="/images/booking-icon.png" alt="Booking" />
              <span>Book a Table</span>
            </div>
            <div className="sidebar-item" onClick={() => navigate("/customer-bookings")}>
              <img src="/images/view-icon.png" alt="View" />
              <span>View My Bookings</span>
            </div>
            <div className="sidebar-item" onClick={() => navigate("/menu")}>
              <img src="/images/menu-icon.png" alt="Menu" />
              <span>View Menu</span>
            </div>
            <div className="sidebar-item" onClick={() => navigate("/customer-checkout")}>
              <img src="/images/orders-icon.png" alt="Checkout" />
              <span>Checkout</span>
            </div>
            <div className="sidebar-item" onClick={() => navigate("/customer-feedback")}>
              <img src="/images/feedback-icon.jpg" alt="Feedback" />
              <span>Feedback</span>
            </div>
            <div className="sidebar-item" onClick={() => navigate("/customer-issues")}>
              <img src="/images/issue-icon.png" alt="Report Issue" />
              <span>Report Issue</span>
            </div>
          </nav>

          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </aside>

        {/* === MAIN CONTENT === */}
        <main className="customer-main">
          <div className="dashboard-wrapper">
            <div className="welcome-section">
              <div className="welcome-header">
                <h1>Welcome, {customerName}</h1>
                <h4 className="welcome-para">
                    <h4>Good Evening!</h4>
                  Welcome to our <strong>Coffee Coop!</strong><br />
                  We’re thrilled to have you here.<br />
                  Relax in our cozy space, savor the rich aroma of freshly brewed coffee, 
                  and explore our handcrafted menu.<br />
                  Your perfect cup awaits.
                </h4>
              </div>

              {/* === STATS CARDS === */}
              <div className="stats-container">
                <div className="stat-card"><h3>🛒 Orders</h3><p>{stats.orders}</p></div>
                <div className="stat-card"><h3>📅 Bookings</h3><p>{stats.bookings}</p></div>
                <div className="stat-card"><h3>💳 Amount Spent</h3><p>₹ {stats.amountSpent}</p></div>
                <div className="stat-card"><h3>✨ Loyalty Points</h3><p>45</p></div>
                <div className="stat-card"><h3>💬 Feedback Given</h3><p>2</p></div>
                <div className="stat-card"><h3>⚠️ Issues Reported</h3><p>2</p></div>
              </div>

              {/* === DONUT CHART === */}
              <CustomerStatsChart stats={stats} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default CustomerDashboard;
