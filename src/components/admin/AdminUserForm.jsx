import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Admin.css";

function AdminUserForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "CHEF"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      role: form.role.toUpperCase()
    };

    axios.post("http://localhost:8080/api/admin/add-user", userData)
      .then(() => {
        toast.success("User added successfully");
        setForm({ name: "", email: "", phone: "", password: "", role: "customer" });
      })
      .catch((error) => {
        console.error("Add user error:", error);
        toast.error(error.response?.data || "Failed to add user");
      });
  };

  return (
    <div className="admin-form">
      <h3>ADD NEW STAFF</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name *" value={form.name} onChange={handleChange} required /><br/>
        <input name="email" placeholder="Email *" value={form.email} onChange={handleChange} required /><br/>
        <input name="phone" placeholder="Phone *" value={form.phone} onChange={handleChange} required /><br/>
        <input name="password" type="password" placeholder="Password *" value={form.password} onChange={handleChange} required /><br/>
        <select name="role" value={form.role} onChange={handleChange}><br/>
          <option value="chef">Chef</option>
          <option value="waiter">Waiter</option>
        </select><br/>
        <button type="submit">ADD STAFF</button><br/>
      </form>
    </div>
  );
}

export default AdminUserForm;
