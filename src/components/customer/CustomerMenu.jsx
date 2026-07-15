import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Customer.css";
import { Link } from "react-router-dom";

function CustomerMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All"); // default
  const customerId = localStorage.getItem("customerId");

  // Fetch menu items
  useEffect(() => {
    axios.get("http://localhost:8080/api/menu")
      .then(res => setMenuItems(res.data))
      .catch(err => console.error("Menu fetch failed:", err));
  }, []);

  // Add item to cart
  const handleAddToCart = (item) => {
    const payload = {
      customerId: customerId,
      menuItemId: item.id,
      quantity: 1
    };

    axios.post("http://localhost:8080/api/customer/cart/add", payload)
      .then(() => {
        alert(`${item.name} added to cart`);
      })
      .catch(err => {
        console.error("Error adding to cart:", err);
        alert("Failed to add to cart");
      });
  };

  // Filter items by category
  const filteredItems = selectedCategory === "All"
    ? menuItems
    : menuItems.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="menu-container">
      <p><Link to="/customer-dashboard" className="back-text">{"Back to dashboard"}</Link></p>
      <h2>Menu</h2>

      {/* Category Buttons */}
      <div className="category-buttons">
        <button onClick={() => setSelectedCategory("All")}>All</button>
        <button onClick={() => setSelectedCategory("Pastery")}>Pastry</button>
        <button onClick={() => setSelectedCategory("Coffee")}>Coffee</button>
        <button onClick={() => setSelectedCategory("Tea")}>Tea</button>
        <button onClick={()=>setSelectedCategory("snack")}>Snack</button>
      </div>

      {/* Menu Grid */}
      <div className="menu-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="menu-card">
            {item.imageUrl ? (
              <img
                src={`http://localhost:8080${item.imageUrl}`}
                alt={item.name}
                className="menu-image"
              />
            ) : (
              <div className="menu-placeholder">No Image</div>
            )}
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><strong>₹{item.price}</strong></p>
            <p className="category">{item.category}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerMenu;
