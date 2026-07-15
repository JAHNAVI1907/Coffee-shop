import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./components/LandingPage";
import Dashboard from "./components/dashboard/Dashboard";
import CustomerLogin from "./components/customer/CustomerLogin";
import CustomerRegister from "./components/customer/CustomerRegister";
import CustomerProfile from "./components/customer/CustomerProfile";
import CustomerBooking from "./components/customer/CustomerBooking";
import CustomerBookingsList from "./components/customer/CustomerBookingsList";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import ChefRegister from "./components/chef/ChefRegister";
import ChefLogin from "./components/chef/ChefLogin";
import ChefDashboard from "./components/chef/ChefDashboard";
import ChefProfile from "./components/chef/ChefProfile";
import WaiterRegister from "./components/waiter/WaiterRegister";
import WaiterLogin from "./components/waiter/WaiterLogin";
import WaiterDashboard from "./components/waiter/WaiterDashboard";
import WaiterProfile from "./components/waiter/WaiterProfile";
import AdminLogin from "./components/admin/AdminLogin";

import AdminDashboard from "./components/admin/AdminDashboard";
import AdminCustomerList from "./components/admin/AdminCustomerList";
import AdminChefList from "./components/admin/AdminChefList";
import AdminWaiterList from "./components/admin/AdminWaiterList";
import AdminBookingList from "./components/admin/AdminBookingList";

import CustomerMenu from './components/customer/CustomerMenu';
import ChefOrders from "./components/chef/ChefOrders";
import WaiterTasks from "./components/waiter/WaiterTasks";
import CustomerOrders from "./components/customer/CustomerOrders";

import CustomerCheckout from "./components/customer/CustomerCheckout";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

import CustomerFeedbackForm from "./components/customer/CustomerFeedbackForm";
import CustomerIssueForm from "./components/customer/CustomerIssueForm"; // create this




function App() {
  return (
    <Router>
      {/* ToastContainer makes toasts available everywhere */}
      <ToastContainer
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/customer-register" element={<CustomerRegister />} />
        <Route path="/customer-profile" element={<CustomerProfile />} />
        <Route path="/customer-booking" element={<CustomerBooking />} />
        <Route path="/customer-bookings" element={<CustomerBookingsList />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/chef-register" element={<ChefRegister />} />
        <Route path="/chef-login" element={<ChefLogin />} />
        <Route path="/chef-dashboard" element={<ChefDashboard/>}/>
        <Route path="/chef-profile" element={<ChefProfile />} />
        <Route path="/waiter-register" element={<WaiterRegister />} />
        <Route path="/waiter-login" element={<WaiterLogin />} />
        <Route path="/waiter-dashboard" element={<WaiterDashboard/>}/>
        <Route path="/waiter-profile" element={<WaiterProfile />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-customers" element={<AdminCustomerList />} />
        <Route path="/admin-chefs" element={<AdminChefList />} />
        <Route path="/admin-waiters" element={<AdminWaiterList />} />
        <Route path="/admin-bookings" element={<AdminBookingList />} />

        <Route path="/menu" element={<CustomerMenu />} />
        <Route path="/chef-orders" element={<ChefOrders />} />
        <Route path="/waiter-tasks" element={<WaiterTasks />} />
        <Route path="/customer/orders" element={<CustomerOrders />} />
        
        <Route path="/customer-checkout" element={<CustomerCheckout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/customer-feedback" element={<CustomerFeedbackForm />} />
        <Route path="/customer-issues" element={<CustomerIssueForm />} />

        
    
      </Routes>
    </Router>
  );
}

export default App;
