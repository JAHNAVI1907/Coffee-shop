import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Waiter.css";

function WaiterLogin() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleLogin = () => {
   axios.post("http://localhost:8080/api/waiter/login", loginData)
  .then(res => {
    localStorage.setItem("waiterId", res.data.id); // ✅ stores ID
    localStorage.setItem("waiterName", res.data.name);
    alert("Login successful");
    navigate("/waiter-profile");
  })
  .catch(() => alert("Login failed"));

  };

  return (
    <div className="waiter-container">
      <h2>Waiter Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default WaiterLogin;
