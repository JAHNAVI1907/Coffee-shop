// src/components/admin/AdminIssueList.jsx
import React, { useEffect, useState } from "react";
import "./Admin.css";// custom styles

function AdminIssueList() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/issues")
      .then(res => res.json())
      .then(data => setIssues(data))
      .catch(err => console.error("Error loading issues", err));
  }, []);

  return (
    <div className="panel-card">
      <h2 className="panel-title">☕ Reported Issues</h2>
      <table className="issue-table">
        <thead>
          <tr>
            <th>👤 Reported By</th>
            <th>⚡ Type</th>
            <th>📝 Description</th>
            <th>⏰ Time</th>
          </tr>
        </thead>
        <tbody>
          {issues.map(i => (
            <tr key={i.id}>
              <td>{i.reportedBy}</td>
              <td><span className="badge">{i.issueType}</span></td>
              <td>{i.description}</td>
              <td>{new Date(i.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminIssueList;
