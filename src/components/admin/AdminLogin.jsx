import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function AdminLogin() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleLogin = () => {
    axios.post("http://localhost:8080/api/admin/login", loginData)
      .then(res => {
        localStorage.setItem("adminName", res.data.name); // ✅ store admin name
        alert("Login successful");
        navigate("/admin-dashboard");
      })
      .catch(() => alert("Login failed"));
  };

  return (
    <div className="admin-container">
      <div className="admin-login-card"></div>
      <h2>Admin Login</h2>
      <p>Sign in to manage your coffee shop</p>
      <input name="email" placeholder="Email" onChange={handleChange} /><br/>
      <input name="password" placeholder="Password" type="password" onChange={handleChange} /><br/>
      <button onClick={handleLogin}>Login</button><br/>
    </div>
  );
}

export default AdminLogin;
