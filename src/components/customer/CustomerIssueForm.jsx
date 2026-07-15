// src/components/customer/CustomerIssueForm.jsx
import React, { useState } from "react";
import "./CustomerForms.css";
import { Link } from "react-router-dom";
import bgImage from "../../assets/dashboard.jpg";

function CustomerIssueForm({ customerName }) {
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8080/api/admin/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportedBy: customerName, issueType, description }),
    });
    alert("Issue reported!");
    setIssueType("");
    setDescription("");
  };

  return (
    <div style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
    alignItems: "center",
    justifyContent: "center",
    }}>
    <div className="panel-card">
        {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/customer-dashboard">← Back to Dashboard</Link>
      </div>
      <h2>Report an Issue</h2>
      <form className="issue-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Issue Type (e.g., UI Bug)"
          value={issueType}
          onChange={(e) => setIssueType(e.target.value)}
          required
        />
        <textarea
          placeholder="Describe the issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
}

export default CustomerIssueForm;
