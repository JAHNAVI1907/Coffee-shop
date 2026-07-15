import React, { useState } from "react";
import axios from "axios";
import "./Booking.css";
import { Link } from "react-router-dom";

function CustomerBooking() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    slot: ""
  });

  const customerId = localStorage.getItem("customerId");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const payload = { ...formData, customerId };
    axios
      .post("http://localhost:8080/api/booking/book", payload)
      .then((res) => alert(res.data))
      .catch((err) => {
        if (err.response?.status === 409) {
          alert("Slot already booked");
        } else {
          alert("Booking failed");
        }
      });
  };

  return (
    <div className="booking-bg">
      <div className="booking-container">
        <p><Link to="/customer-dashboard" className="back-text">{"Back to dashboard"}</Link></p>
        <h2>Book a Table</h2>
        <input type="date" name="date" onChange={handleChange} />
        <input type="time" name="time" onChange={handleChange} />
        <select name="slot" onChange={handleChange}>
          <option value="">Select Slot</option>
          <option value="Window">Window</option>
          <option value="Center">Center</option>
          <option value="Corner">Corner</option>
        </select>
        <button onClick={handleSubmit}>Book</button>
      </div>
    </div>
  );
}

export default CustomerBooking;
