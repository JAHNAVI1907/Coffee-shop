import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Customer.css";
import { Link } from "react-router-dom";

function CustomerMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const customerId = localStorage.getItem("customerId");

  // Fetch menu items
  useEffect(() => {
    axios.get("http://localhost:8080/api/menu")
      .then(res => setMenuItems(res.data))
      .catch(err => console.error("Menu fetch failed:", err));
  }, []);

  // Fetch bookings for dropdown
  useEffect(() => {
    axios.get(`http://localhost:8080/api/booking/customer/${customerId}`)
      .then(res => setBookings(res.data))
      .catch(() => alert("Failed to load bookings"));
  }, [customerId]);

  const handleAddToCart = (item) => {
    const payload = {
      customerId: customerId,
      menuItemId: item.id,
      quantity: 1
    };

    axios.post("http://localhost:8080/api/customer/cart/add", payload)
      .then(res => {
        alert(`${item.name} added to cart`);
        setCart(res.data);
      })
      .catch(err => {
        console.error("Error adding to cart:", err);
        alert("Failed to add to cart");
      });
  };

  const handleViewCart = () => {
    axios.get(`http://localhost:8080/api/customer/cart/${customerId}`)
      .then(res => {
        setCart(res.data);
        setShowCart(true);
      })
      .catch(err => {
        console.error("Error fetching cart:", err);
        alert("Failed to fetch cart");
      });
  };

  const handlePlaceOrder = () => {
    if (!cart || !cart.items || !selectedBookingId) {
      alert("Please select a booking and add items to cart!");
      return;
    }

    axios.post("http://localhost:8080/api/orders/place", {
      customerId,
      bookingId: selectedBookingId,   // ✅ attach bookingId
      items: cart.items.map(ci => ({
        itemId: ci.menuItem.id,
        quantity: ci.quantity
      }))
    })
    .then(() => {
      alert("Order placed successfully!");
      setCart(null);
      setShowCart(false);
      setSelectedBookingId(""); // reset dropdown
    })
    .catch(err => {
      console.error("Error placing order:", err);
      alert("Failed to place order");
    });
  };

  return (
    <div className="menu-container">
      <p><Link to="/customer-dashboard" className="back-text">{"Back to dashboard"}</Link></p>
      <h2>Menu</h2>

      <button className="view-cart-button" onClick={handleViewCart}>
        View Cart
      </button>

      <div className="menu-grid">
        {menuItems.map(item => (
          <div key={item.id} className="menu-card">
            <img src={item.imageUrl} alt={item.name} className="menu-image" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><strong>₹{item.price}</strong></p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {showCart && cart && cart.items && (
        <div className="cart-popup">
          <h3>Your Cart</h3>

          {/* Booking dropdown */}
          <div className="booking-select">
            <label>Select Booking:</label>
            <select
              value={selectedBookingId}
              onChange={e => setSelectedBookingId(e.target.value)}
            >
              <option value="">-- Select Booking --</option>
              {bookings.map(b => (
                <option key={b.id} value={b.id}>
                  {b.slot} | {b.date} | {b.time}
                </option>
              ))}
            </select>
          </div>

          {/* Cart items */}
          {cart.items.map(ci => (
            <p key={ci.id}>
              {ci.menuItem?.name || "Unknown Item"} × {ci.quantity}
            </p>
          ))}

          <button onClick={handlePlaceOrder}>Place Order</button>
          <button onClick={() => setShowCart(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default CustomerMenu;
