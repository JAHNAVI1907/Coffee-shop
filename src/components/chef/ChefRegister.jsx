import React, { useState } from "react";
import axios from "axios";
import "./Chef.css";

function ChefRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = () => {
    axios.post("http://localhost:8080/api/chef/register", formData)
      .then(res => alert(res.data))
      .catch(() => alert("Registration failed"));
  };

  return (
    <div className="chef-container">
      <h2>Chef Registration</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default ChefRegister;
