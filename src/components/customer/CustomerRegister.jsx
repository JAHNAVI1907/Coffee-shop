import React, { useState } from "react";
import axios from "axios";
import "./Customer.css";

function CustomerRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = () => {
    axios.post("http://localhost:8080/api/customer/register", formData)
      .then(res => alert(res.data))
      .catch(() => alert("Registration failed"));
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} /><br/>
      <input name="email" placeholder="Email" onChange={handleChange} /><br/>
      <input name="password" placeholder="Password" type="password" onChange={handleChange} /><br/>
      <input name="phone" placeholder="Phone" onChange={handleChange} /><br/>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default CustomerRegister;
