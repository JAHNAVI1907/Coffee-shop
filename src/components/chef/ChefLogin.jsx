import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Chef.css";

function ChefLogin() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleLogin = () => {
    axios.post("http://localhost:8080/api/chef/login", loginData)
  .then(res => {
    localStorage.setItem("chefId", res.data.id); // ✅ stores ID
    localStorage.setItem("customerName",res.data.name);
    alert("Login successful");
    navigate("/chef-profile"); // ✅ goes to profile
  })
  .catch(() => alert("Login failed"));

  };

  return (
    <div className="chef-container">
      <h2>Chef Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default ChefLogin;
