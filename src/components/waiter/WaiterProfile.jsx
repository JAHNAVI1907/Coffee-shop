import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Waiter.css";
import { Link } from "react-router-dom";

function WaiterProfile() {
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    phone: ""
  });

 useEffect(() => {
  const id = localStorage.getItem("waiterId");
  axios.get(`http://localhost:8080/api/waiter/profile/${id}`)
    .then(res => setProfile(res.data))
    .catch(err => {
      console.log("Fetch error:", err);
      alert("Failed to load profile");
    });
}, []);


  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleUpdate = () => {
    const dto = {
      name: profile.name,
      email: profile.email,
      phone: profile.phone
    };
    axios.put(`http://localhost:8080/api/waiter/update/${profile.id}`, dto)
      .then(res => alert(res.data))
      .catch(() => alert("Update failed"));
  };

  return (
    <div className="waiter-container">
      <p><Link to="/waiter-dashboard" className="back-text">{"Back to dashboard"}</Link></p>
      <h2>Waiter Profile</h2>
      <input name="name" value={profile.name} placeholder="name" onChange={handleChange} />
      <input name="email" value={profile.email} placeholder="email" onChange={handleChange} />
      <input name="phone" value={profile.phone} placeholder="phone" onChange={handleChange} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default WaiterProfile;
