// src/components/admin/AdminPaymentList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Admin.css";

const AdminPaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = () => {
    axios
      .get("http://localhost:8080/api/admin/payments")
      .then((res) => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching payments");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="admin-list-page">
      <h2>All Payments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Gateway</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.orderId}</td>
                <td>{p.customer?.name || p.customerName}</td>
                <td>₹{p.amount}</td>
                <td>{p.status}</td>
                <td>{p.gateway}</td>
                <td>{new Date(p.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPaymentList;
