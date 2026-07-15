import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

function AdminUserTable() {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("customer");

  useEffect(() => {
    const fetchUsersByRole = async () => {
      try {
        let response;

        if (selectedRole === "customer") {
          response = await axios.get("http://localhost:8080/api/admin/customers");
        } else if (selectedRole === "chef") {
          response = await axios.get("http://localhost:8080/api/admin/chefs");
        } else if (selectedRole === "waiter") {
          response = await axios.get("http://localhost:8080/api/admin/waiters");
        } else if (selectedRole === "booking") {
          response = await axios.get("http://localhost:8080/api/admin/bookings");
        }

        setUsers(response.data);
      } catch (error) {
        alert(`Failed to fetch ${selectedRole}s`);
        setUsers([]);
      }
    };

    fetchUsersByRole();
  }, [selectedRole]);

  const handleDelete = (id) => {
    let endpoint = "";

    if (selectedRole === "customer") {
      endpoint = "delete-customer";
    } else if (selectedRole === "chef") {
      endpoint = "delete-chef";
    } else if (selectedRole === "waiter") {
      endpoint = "delete-waiter";
    } else if (selectedRole === "booking") {
      endpoint = "delete-booking";
    }

    axios.delete(`http://localhost:8080/api/admin/${endpoint}/${id}`)
      .then(() => {
        setUsers(users.filter(u => u.id !== id));
        alert(`${selectedRole} deleted successfully`);
      })
      .catch(() => alert("Delete failed"));
  };

  return (
    <div className="user-table">
      <h3>Manage {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}s</h3>

      {/* Role Filter Dropdown */}
      <select onChange={(e) => setSelectedRole(e.target.value)} value={selectedRole}>
        <option value="customer">Customer</option>
        <option value="chef">Chef</option>
        <option value="waiter">Waiter</option>
        <option value="booking">Booking</option>
      </select>

      {/* Dynamic Table */}
      <table>
        <thead>
          <tr>
            {selectedRole === "booking" ? (
              <>
                <th>S. No</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
              </>
            ) : (
              <>
                <th>S. No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={u.id}>
              {selectedRole === "booking" ? (
                <>
                  <td>{index + 1}</td>
                  <td>{u.customerName}</td>
                  <td>{u.email}</td>
                  <td>{u.date}</td>
                  <td>{u.time}</td>
                  <td>{u.tableName}</td>
                  <td>
                    <button onClick={() => handleDelete(u.id)}>🗑️</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{index + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role || selectedRole.toUpperCase()}</td>
                  <td>{u.phone || "—"}</td>
                  <td>
                    <button onClick={() => handleDelete(u.id)}>🗑️</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUserTable;
