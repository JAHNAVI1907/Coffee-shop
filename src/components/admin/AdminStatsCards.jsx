// AdminStatsCards.jsx
import React, { useEffect, useState } from "react";
import "./Admin.css";

function AdminStatsCards() {
  const [stats, setStats] = useState({
    customers: 0,
    chefs: 0,
    waiters: 0,
    bookings: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/stats")
      .then(r => r.json())
      .then(data => setStats(data))
      .catch(() => {
        setStats({ customers: 18, chefs: 14, waiters: 10, bookings: 10 });
      });
  }, []);

  return (
    <div className="stats-cards">
      <div className="stat-card">
        <div className="stat-value">{stats.customers}</div>
        <div className="stat-label">Customers</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{stats.chefs}</div>
        <div className="stat-label">Chefs</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{stats.waiters}</div>
        <div className="stat-label">Waiters</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{stats.bookings}</div>
        <div className="stat-label">Bookings</div>
      </div>
    </div>
  );
}

export default AdminStatsCards;