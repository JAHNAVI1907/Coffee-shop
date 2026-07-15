import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Admin.css";
import { Link } from "react-router-dom";

const AdminBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchBookings = () => {
    axios
      .get("http://localhost:8080/api/admin/bookings")
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error fetching bookings");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setDeletingId(id);
      axios
        .delete(`http://localhost:8080/api/booking/delete/${id}`)
        .then(() => {
          toast.success("Booking deleted successfully");
          fetchBookings();
        })
        .catch((err) => {
          toast.error("Error deleting booking");
          console.error(err);
        })
        .finally(() => {
          setDeletingId(null);
        });
    }
  };

  return (
    <div className="admin-list-page">
       <p><Link to="/admin-dashboard" className="back-text">{"Back to dashboard"}</Link></p>
      <h2>All Bookings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.customerName}</td>
                <td>{booking.email}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(booking.id)}
                    disabled={deletingId === booking.id}
                  >
                    {deletingId === booking.id ? "Deleting..." : "Delete"}
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

export default AdminBookingList;
