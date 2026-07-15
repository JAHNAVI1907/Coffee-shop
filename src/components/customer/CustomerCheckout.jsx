import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Customer.css";
import { Link } from "react-router-dom";

function CustomerCheckout() {
  const [cart, setCart] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const customerId = localStorage.getItem("customerId");

  // ✅ Fetch cart
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/customer/cart/${customerId}`)
      .then((res) => {
        setCart(res.data);
        const sub = res.data.items.reduce(
          (sum, ci) => sum + ci.menuItem.price * ci.quantity,
          0
        );
        setSubtotal(sub);
        const tax = 10; // example fixed tax
        setTaxes(tax);
        setGrandTotal(sub + tax);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, [customerId]);

  // ✅ Fetch bookings
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/booking/customer/${customerId}`)
      .then((res) => setBookings(res.data))
      .catch(() => alert("Failed to load bookings"));
  }, [customerId]);

  // ✅ Place Order
  const handlePlaceOrder = async () => {
    if (!selectedBookingId) {
      alert("Please select a booking before placing order!");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/orders/place", {
        customerId,
        bookingId: selectedBookingId,
        items: cart.items.map((ci) => ({
          itemId: ci.menuItem.id,
          quantity: ci.quantity,
        })),
      });
      setOrderPlaced(true);
      alert("Order placed successfully!");
    } catch (error) {
      alert("Failed to place order");
    }
  };

  // ✅ Pay Bill with Razorpay integration
  const handlePayment = async () => {
    if (!selectedBookingId) {
      alert("Please select a booking before payment!");
      return;
    }
    try {
      // Step 1: Initiate payment
      const response = await axios.post(
        "http://localhost:8080/api/payments/initiate",
        {
          orderId: cart.id,
          bookingId: selectedBookingId,
          amount: grandTotal,
          currency: "INR",
          customerId, // include customerId if backend expects it
        }
      );

      const { gatewayOrderId, amountInPaise, currency } = response.data;

      // Step 2: Open Razorpay checkout popup
      const options = {
        key: "rzp_test_ReMF444qG6iZI1", // replace with your Razorpay key
        amount: amountInPaise,
        currency: currency,
        name: "Coffee Coop",
        description: "Order Payment",
        order_id: gatewayOrderId,
        handler: async function (res) {
          console.log("Razorpay response:", res);
          // should show {razorpay_order_id, razorpay_payment_id, razorpay_signature}
          // Step 3: Verify payment with backend
          try {
            const verifyRes = await axios.post(
              "http://localhost:8080/api/payments/verify",
              {
                gatewayOrderId: res.razorpay_order_id,
                gatewayPaymentId: res.razorpay_payment_id,
                signature: res.razorpay_signature,
                orderId: cart.id,
              }
            );

            setPaymentStatus(verifyRes.data.status); // SUCCESS or FAILED
            // ✅ Invoice will be emailed automatically by backend
          } catch (err) {
            console.error("Verification failed:", err);
            setPaymentStatus("FAILED ❌");
          }
        },
        prefill: {
          name: "Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#6f4e37",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      setPaymentStatus("FAILED ❌");
    }
  };

  return (
    <div className="checkout-bg">
    <div className="checkout-container">
      <p><Link to="/customer-dashboard" className="back-text">{"Back to dashboard"}</Link></p>
      <h2>Checkout</h2>
      {cart && cart.items && cart.items.length > 0 ? (
        <>
          {/* Booking dropdown */}
          <div className="booking-select">
            <label>Select Booking:</label>
            <select
              value={selectedBookingId}
              onChange={(e) => setSelectedBookingId(e.target.value)}
            >
              <option value="">-- Select Booking --</option>
              {bookings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.slot} | {b.date} | {b.time}
                </option>
              ))}
            </select>
          </div>

          {/* Cart table */}
          <table className="checkout-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((ci) => (
                <tr key={ci.id}>
                  <td>{ci.menuItem.name}</td>
                  <td>{ci.quantity}</td>
                  <td>₹{ci.menuItem.price}</td>
                  <td>₹{ci.menuItem.price * ci.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary + Actions */}
          <div className="checkout-summary">
            <p>Subtotal: ₹{subtotal}</p>
            <p>Taxes: ₹{taxes}</p>
            <h3>Grand Total: ₹{grandTotal}</h3>

            <button className="place-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>

            <button className="pay-btn" onClick={handlePayment}>
              Pay Bill ₹{grandTotal}
            </button>

            {paymentStatus && <p>Payment Status: {paymentStatus}</p>}
            {/* ✅ No invoice button here — invoice is emailed automatically */}
          </div>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
    </div>
  );
}

export default CustomerCheckout;
