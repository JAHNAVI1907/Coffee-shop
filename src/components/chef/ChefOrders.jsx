import React, { useEffect, useState } from "react";
import axios from "axios";
import "../customer/Customer.css"; // Reuse styling
import { Link } from "react-router-dom";

function ChefOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch assigned orders for the chef
    axios.get('http://localhost:8080/api/chef/orders/all')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const updateStatus = (orderId, newStatus) => {
    axios.put(`http://localhost:8080/api/chef/orders/${orderId}/status`, { status: newStatus })
      .then(() => {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <div className="dashboard-container">
      <div className="overlay">
        <p><Link to="/chef-dashboard" className="back-text">{"Back to dashboard"}</Link></p>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "white" }}>
          Assigned Orders 🍽️
        </h2>
        {orders.length === 0 ? (
          <p>No orders assigned yet.</p>
        ) : (
          <div className="order-grid">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <h3>Order #{order.id}</h3>
                <p><strong>Customer:</strong> {order.customerName}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Time:</strong> {new Date(order.orderTime).toLocaleString()}</p>

                {order.status === "PENDING" && (
                  <button onClick={() => updateStatus(order.id, "IN_PROGRESS")}>
                    Start Preparing
                  </button>
                )}
                {order.status === "IN_PROGRESS" && (
                  <button onClick={() => updateStatus(order.id, "FINISHED")}>
                    Mark as Finished
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChefOrders;
