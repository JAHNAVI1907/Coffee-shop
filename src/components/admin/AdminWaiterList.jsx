import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Admin.css";
import { Link } from "react-router-dom";

const AdminWaiterList = () => {
  const [waiters, setWaiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchWaiters = () => {
    axios
      .get("http://localhost:8080/api/admin/waiters")
      .then((res) => {
        setWaiters(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error fetching waiters");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWaiters();
  }, []);

  const handleDelete = (id) => {
    console.log("Clicked delete for waiter ID:", id);

    if (window.confirm("Are you sure you want to delete this waiter?")) {
      setDeletingId(id);
      axios
        .delete(`http://localhost:8080/api/waiter/delete/${id}`)
        .then(() => {
          toast.success("Waiter deleted successfully");
          fetchWaiters();
        })
        .catch((err) => {
          toast.error("Error deleting waiter");
          console.error(err);
        })
        .finally(() => {
          setDeletingId(null);
        });
    }
  };

  return (
    <div className="admin-list-page">
       <p><Link to="/admin-dashboard" className="back-text">{"Back to dashboard"}</Link></p>
      <h2>All Waiters</h2>
      {loading ? (
        <p>Loading...</p>
      ) : waiters.length === 0 ? (
        <p>No waiters found.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {waiters.map((w) => (
              <tr key={w.id}>
                <td>{w.id}</td>
                <td>{w.name}</td>
                <td>{w.email}</td>
                <td>{w.phone}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(w.id)}
                    disabled={deletingId === w.id}
                  >
                    {deletingId === w.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminWaiterList;
