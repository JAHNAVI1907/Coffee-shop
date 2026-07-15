// src/components/admin/AdminOrderList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Admin.css";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchOrders = () => {
    axios
      .get("http://localhost:8080/api/admin/orders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error fetching orders");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setDeletingId(id);
      axios
        .delete(`http://localhost:8080/api/order/delete/${id}`)
        .then(() => {
          toast.success("Order deleted successfully");
          fetchOrders();
        })
        .catch((err) => {
          toast.error("Error deleting order");
          console.error(err);
        })
        .finally(() => {
          setDeletingId(null);
        });
    }
  };

  return (
    <div className="admin-list-page">
      <h2>All Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Chef</th>
              <th>Waiter</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>₹{order.totalAmount}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.chef ? order.chef.name : "—"}</td>
                <td>{order.waiter ? order.waiter.name : "—"}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(order.id)}
                    disabled={deletingId === order.id}
                  >
                    {deletingId === order.id ? "Deleting..." : "Delete"}
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

export default AdminOrderList;
