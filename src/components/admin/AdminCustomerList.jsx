import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Admin.css";
import { Link } from "react-router-dom";

const AdminCustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchCustomers = () => {
    axios
      .get("http://localhost:8080/api/admin/customers")
      .then((res) => {
        setCustomers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error fetching customers");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = (id) => {
    console.log("Clicked delete for customer ID:", id);

    if (window.confirm("Are you sure you want to delete this customer?")) {
      setDeletingId(id);
      axios
        .delete(`http://localhost:8080/api/customer/delete/${id}`)
        .then(() => {
          toast.success("Customer deleted successfully");
          fetchCustomers();
        })
        .catch((err) => {
          toast.error("Error deleting customer");
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
      <h2>All Customers</h2>
      {loading ? (
        <p>Loading...</p>
      ) : customers.length === 0 ? (
        <p>No customers found.</p>
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
            {customers.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(c.id)}
                    disabled={deletingId === c.id}
                  >
                    {deletingId === c.id ? "Deleting..." : "Delete"}
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

export default AdminCustomerList;
