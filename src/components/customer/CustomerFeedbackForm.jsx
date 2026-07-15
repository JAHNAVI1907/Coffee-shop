// src/components/customer/CustomerFeedbackForm.jsx
import React, { useState } from "react";
import "./CustomerForms.css";
import { Link } from "react-router-dom";
import bgImage from "../../assets/dashboard.jpg";


function CustomerFeedbackForm({ customerName }) {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8080/api/admin/feedbacks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerName, message, rating }),
    });
    alert("Feedback submitted!");
    setMessage("");
    setRating(5);
  };

  return (
    <div style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
    alignItems: "center",
    justifyContent: "center"
    }}>
    <div className="panel-card">
    {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/customer-dashboard">Back to Dashboard</Link>
      </div>
      <h2>Submit Feedback</h2>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Your Feedback"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1,2,3,4,5].map(r => <option key={r} value={r}>{r} Stars</option>)}
        </select>
        <button type="submit">Send</button>
      </form>
      </div>
    </div>
  );
}

export default CustomerFeedbackForm;
