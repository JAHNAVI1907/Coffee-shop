import React, { useEffect, useState } from "react";
import axios from "axios";
import "../customer/Customer.css"; // Reuse styling
import "./Waiter.css"; // Add waiter-specific styles
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

function WaiterTasks() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/waiter/orders/ready-to-serve')
      .then(res => {
        const finishedOrders = res.data.filter(order => order.status === "FINISHED");
        setOrders(finishedOrders);
      })
      .catch(err => toast.error("Failed to load orders."));
  }, []);

  const markAsServed = async (orderId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/orders/admin/orders/${orderId}/status?status=SERVED`,
      { method: "PUT" }
    );

    if (response.ok) {
      const updatedOrder = await response.json();
      toast.success(`Order #${updatedOrder.id} marked as SERVED ✅`);
      // update UI state
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? updatedOrder : o))
      );
    } else {
      toast.error("Failed to update order status ❌");
    }
  } catch (err) {
    toast.error("Error while updating order ⚠️");
    console.error(err);
  }
};
 


  // ✅ Example function to place an order with bookingId
  const placeOrder = (loggedInCustomerId, selectedBookingId, cartItems) => {
    axios.post("http://localhost:8080/api/orders/place", {
  customerId: loggedInCustomerId,
  bookingId: selectedBookingId,   // ✅ must be passed
  items: cartItems.map(item => ({
    itemId: item.id,
    quantity: item.quantity
  }))
})
    .then(res => {
      toast.success("Order placed successfully!");
    })
    .catch(err => {
      toast.error("Failed to place order.");
    });
  };

  return (
    <div className="dashboard-container">
      <div className="overlay">
        <p><Link to="/waiter-dashboard" className="back-text">{"Back to dashboard"}</Link></p>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "white" }}>
          Assigned Tables 🍽️
        </h2>
        {orders.length === 0 ? (
          <p>No finished orders to serve.</p>
        ) : (
          <div className="order-grid">
            {orders.map(order => (
              <div className="order-card">
  <h3>Order #{order.id}</h3>
  <p><strong>Customer:</strong> {order.customerName}</p>
  <p><strong>Status:</strong> {order.status}</p>
  <p><strong>Slot:</strong> {order.booking?.slot || "---"}</p>
  <p><strong>Date:</strong> {order.booking?.date || "---"}</p>
  <p><strong>Time:</strong> {order.booking?.time || "---"}</p>
  <ul>
    {order.items.map((item, i) => (
      <li key={i}>
        {item.menuItem?.name || "Unknown Item"} × {item.quantity}
      </li>
    ))}
  </ul>
  <button onClick={() => markAsServed(order.id)}>Mark as Served</button>
</div>

            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default WaiterTasks;
