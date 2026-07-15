import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const MenuForm = ({ onItemAdded, editItem, clearEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageFile: null
  });

  useEffect(() => {
    if (editItem) {
      setFormData({
        name: editItem.name,
        description: editItem.description,
        price: editItem.price.toString(),
        category: editItem.category,
        imageFile: null // file upload won't prefill
      });
    }
  }, [editItem]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

   const handleSubmit = (e) => {
  e.preventDefault();

  const payload = new FormData();
  payload.append("name", formData.name);
  payload.append("description", formData.description);
  payload.append("price", parseFloat(formData.price));
  payload.append("category", formData.category);
  if (formData.imageFile) {
    payload.append("imageFile", formData.imageFile);
  }

  const url = editItem
    ? `http://localhost:8080/api/admin/menu/${editItem.id}`
    : 'http://localhost:8080/api/admin/menu/add-dto';

  const method = editItem ? axios.put : axios.post;

  method(url, payload, {
    headers: { "Content-Type": "multipart/form-data" }
  })
    .then(() => {
      alert(editItem ? "Item updated successfully ✅" : "Item added successfully ✅");
      onItemAdded();
      clearEdit && clearEdit();
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        imageFile: null
      });
    })
    .catch((error) => {
      console.error("Submit error:", error.response?.data || error.message);
      alert("Failed to submit item");
    });
};
    

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h3>{editItem ? "Edit Menu Item" : "Add Menu Item"}</h3>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name *"
        required
      /><br/>
      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description *"
        required
      /><br/>
      <input
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price *"
        required
      /><br/>
      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category *"
        required
      /><br/>
      <input
        type="file"
        name="imageFile"
        onChange={handleChange}
        accept="image/*"
      /><br/>
      <button type="submit">
        {editItem ? "UPDATE ITEM" : "ADD ITEM"}
      </button><br/>
    </form>
  );
};

export default MenuForm;
