import React from 'react';
import './Admin.css';

const MenuItemCard = ({ item, onDelete, onEdit }) => {
  return (
    <div className="menu-card">
      {item.imageUrl ? (
        <img
          src={`http://localhost:8080${item.imageUrl}`}
          alt={item.name}
          className="menu-image"
        />
      ) : (
        <div className="menu-placeholder">No Image</div>
      )}
      <h4>{item.name}</h4>
      <p>{item.description}</p>
      <p><strong>₹{item.price}</strong></p>
      <p className="category">{item.category}</p>
      <button onClick={() => onEdit(item)}>Edit</button>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
};

export default MenuItemCard;
