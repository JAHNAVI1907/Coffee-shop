// src/components/admin/AdminFeedbackList.jsx
import React, { useEffect, useState } from "react";
import "./Admin.css";

function AdminFeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/feedbacks")
      .then(res => res.json())
      .then(data => setFeedbacks(data))
      .catch(err => console.error("Error loading feedbacks", err));
  }, []);

  return (
    <div className="panel-card">
      <h2 className="panel-title">☕ Customer Feedback</h2>
      <table className="feedback-table">
        <thead>
          <tr>
            <th>👤 Customer</th>
            <th>📝 Message</th>
            <th>⭐ Rating</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(f => (
            <tr key={f.id}>
              <td>{f.customerName}</td>
              <td>{f.message}</td>
              <td>
                <span className={`badge rating-${f.rating}`}>
                  {f.rating} / 5
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminFeedbackList;
