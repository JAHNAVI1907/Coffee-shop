// src/components/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import loginBg from "../assets/login-bg.jpg"; // ✅ background image
import { Link } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = () => {
    axios.post("http://localhost:8080/api/user/login", formData)
      .then(res => {
        const { id, name, role } = res.data;
        localStorage.setItem(`${role.toLowerCase()}Id`, id);
        localStorage.setItem(`${role.toLowerCase()}Name`, name);
        localStorage.setItem("userRole", role);
        alert("Login successful");
        navigate(`/${role.toLowerCase()}-dashboard`);
      })
      .catch(() => alert("Login failed"));
  };

  return (
    <div
      className="auth-page"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="auth-box">
        <Link to="/" className="back-text">{"< Back to Home"}</Link>
        <h2>Login</h2>
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button onClick={handleLogin}>Login</button>
        <p>Don’t have an account? <Link to="/register" className="back-text">{"Register here"}</Link></p>
        
      </div>
   
    </div>
  );
}

export default LoginPage;
