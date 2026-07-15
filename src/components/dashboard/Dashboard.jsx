import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Welcome to Coffee Coop</h1>
      <div className="role-grid">
        <div className="role-card">
          <h3>Customer</h3>
          <button onClick={() => navigate("/customer-login")}>Login</button>
          <button onClick={() => navigate("/customer-register")}>Register</button>
        </div>
        <div className="role-card">
          <h3>Chef</h3>
          <button onClick={() => navigate("/chef-login")}>Login</button>
          <button onClick={() => navigate("/chef-register")}>Register</button>
        </div>
        <div className="role-card">
          <h3>Waiter</h3>
          <button onClick={() => navigate("/waiter-login")}>Login</button>
          <button onClick={() => navigate("/waiter-register")}>Register</button>
        </div>
        <div className="role-card">
          <h3>Admin</h3>
          <button onClick={() => navigate("/admin-login")}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
