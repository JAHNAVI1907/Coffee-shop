import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Booking.css";
import { Link } from "react-router-dom";

function CustomerBookingsList() {
  const [bookings, setBookings] = useState([]);
  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/booking/customer/${customerId}`)
      .then(res => setBookings(res.data))
      .catch(() => alert("Failed to load bookings"));
  }, []);

  return (
    <div className="table-bg">
    <div className="booking-container">
      <p><Link to="/customer-dashboard" className="back-text">{"Back to dashboard"}</Link></p>
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <ul>
          {bookings.map(b => (
            <li key={b.id}>
              {b.date} at {b.time} — {b.slot}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}

export default CustomerBookingsList;
