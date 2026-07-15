import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Customer.css";

function CustomerLogin() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleLogin = () => {
    axios.post("http://localhost:8080/api/customer/login", loginData)
      .then(res => {
        console.log("Login response:", res.data); // ✅ Debugging
        localStorage.setItem("customerId", res.data.id);
        localStorage.setItem("customerName", res.data.name); // ✅ Store name
        alert("Login successful");
        navigate("/customer-dashboard");
      })
      .catch(() => alert("Login failed"));
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} /><br/>
      <input name="password" placeholder="Password" type="password" onChange={handleChange} /><br/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default CustomerLogin;
