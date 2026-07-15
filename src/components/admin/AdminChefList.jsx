import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Admin.css";
import { Link } from "react-router-dom";

const AdminChefList = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchChefs = () => {
    axios
      .get("http://localhost:8080/api/admin/chefs")
      .then((res) => {
        setChefs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error fetching chefs");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchChefs();
  }, []);

  const handleDelete = (id) => {
    console.log("Clicked delete for chef ID:", id);

    if (window.confirm("Are you sure you want to delete this chef?")) {
      setDeletingId(id);
      axios
        .delete(`http://localhost:8080/api/chef/delete/${id}`)
        .then(() => {
          toast.success("Chef deleted successfully");
          fetchChefs();
        })
        .catch((err) => {
          toast.error("Error deleting chef");
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
      <h2>All Chefs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : chefs.length === 0 ? (
        <p>No chefs found.</p>
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
            {chefs.map((chef) => (
              <tr key={chef.id}>
                <td>{chef.id}</td>
                <td>{chef.name}</td>
                <td>{chef.email}</td>
                <td>{chef.phone}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(chef.id)}
                    disabled={deletingId === chef.id}
                  >
                    {deletingId === chef.id ? "Deleting..." : "Delete"}
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

export default AdminChefList;
