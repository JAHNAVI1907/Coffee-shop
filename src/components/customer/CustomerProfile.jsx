import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Customer.css";
import { Link } from "react-router-dom";

function CustomerProfile() {
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    const id = localStorage.getItem("customerId");
    axios.get(`http://localhost:8080/api/customer/profile/${id}`)
      .then(res => setProfile(res.data))
      .catch(() => alert("Failed to load profile"));
  }, []);

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleUpdate = () => {
    const dto = {
      name: profile.name,
      email: profile.email,
      phone: profile.phone
    };
    axios.put(`http://localhost:8080/api/customer/profile/${profile.id}`, dto)
      .then(res => alert(res.data))
      .catch(() => alert("Update failed"));
  };

  return (
    <div className="form-container">
      <p><Link to="/customer-dashboard" className="back-text">{"Back to dashboard"}</Link></p>
      <h2>Profile</h2>
      <input name="name" value={profile.name} onChange={handleChange} /><br/>
      <input name="email" value={profile.email} onChange={handleChange} /><br/>
      <input name="phone" value={profile.phone} onChange={handleChange} /><br/>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default CustomerProfile;
