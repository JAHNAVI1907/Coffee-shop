// src/components/RegisterPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import registerBg from "../assets/login-bg.jpg"; // ✅ background image
import { Link } from "react-router-dom";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "CUSTOMER"
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = () => {
    axios.post("http://localhost:8080/api/customer/register", formData)
      .then(() => {
        alert("Registration successful! Please log in.");
        navigate("/login");
      })
      .catch(() => alert("Registration failed"));
  };

  return (
    <div
      className="auth-page"
      style={{ backgroundImage: `url(${registerBg})` }}
    >
      <div className="auth-box">
        <Link to="/" className="back-text">{"< Back to Home"}</Link>
        <h2>Register</h2>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button onClick={handleRegister}>Register</button>
        <p>Already registered? <Link to="/login" className="back-text">{" Login here"}</Link></p>
      </div>
    </div>
  );
}

export default RegisterPage;
