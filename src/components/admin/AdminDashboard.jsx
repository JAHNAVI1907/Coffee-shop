// src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  FiHome,
  FiUserPlus,
  FiPlusCircle,
  FiUsers,
  FiMenu,
  FiCoffee,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiMessageSquare,
  FiAlertCircle,
} from "react-icons/fi";
import Particles from "react-tsparticles";
import AdminUserForm from "./AdminUserForm";
import AdminUserTable from "./AdminUserTable";
import MenuForm from "./MenuForm";
import MenuItemCard from "./MenuItemCard";
import AnimatedCounterCard from "./AnimatedCounterCard";
import AdminStatsChart from "./AdminChart";
import AdminCustomerList from "./AdminCustomerList";
import AdminChefList from "./AdminChefList";
import AdminWaiterList from "./AdminWaiterList";
import AdminBookingList from "./AdminBookingList";
import AdminOrderList from "./AdminOrderList";
import AdminPaymentList from "./AdminPaymentList";
import AdminPieChart from "./AdminPieChart";
import AdminFeedbackList from "./AdminFeedbackLsit";
import AdminIssueList from "./AdminIssueList";
import "./Admin.css";


const SIDEBAR_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: <FiHome /> },
  { id: "add-staff", label: "Add New Staff", icon: <FiUserPlus /> },
  { id: "add-item", label: "Add New Item", icon: <FiPlusCircle /> },
  { id: "managing", label: "Managing", icon: <FiUsers /> },
  { id: "view-menu", label: "View Menu", icon: <FiMenu /> },
  { id: "feedback", label: "Feedback", icon: <FiMessageSquare /> },
  { id: "issues", label: "Report Issues", icon: <FiAlertCircle /> },
];

function AdminDashboard() {
  const adminName = localStorage.getItem("adminName") || "Navin";
  const [activeSection, setActiveSection] = useState("dashboard");

  const [menuItems, setMenuItems] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const fetchMenu = () => {
    fetch("http://localhost:8080/api/admin/menu")
      .then((r) => r.json())
      .then((data) => setMenuItems(Array.isArray(data) ? data : []))
      .catch(() => alert("Failed to load menu"));
  };

  const handleDelete = (id) =>
    fetch(`http://localhost:8080/api/admin/menu/${id}`, { method: "DELETE" }).then(fetchMenu);

  const handleEdit = (item) => setEditItem(item);

  useEffect(() => fetchMenu(), []);

  const [stats, setStats] = useState({
    customers: 0,
    chefs: 0,
    waiters: 0,
    bookings: 0,
    orders: 0,
    earnings: 0,
    feedbackCount: 0,
    issueCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsRes = await fetch("http://localhost:8080/api/admin/stats").then((r) => r.json());
        const earningsRes = await fetch("http://localhost:8080/api/admin/earnings").then((r) => r.json());

        setStats({
          customers: statsRes.customers || 0,
          chefs: statsRes.chefs || 0,
          waiters: statsRes.waiters || 0,
          bookings: statsRes.bookings || 0,
          orders: statsRes.orders || 0,
          earnings: typeof earningsRes === "number" ? earningsRes : 0,
          feedbackCount: statsRes.feedbackCount || 0,
          issueCount: statsRes.issueCount || 0,
        });
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    fetchStats();
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <>
            <h1 className="welcome-title">Welcome, {adminName} ☕</h1>
            <div className="stats-cards">
              <AnimatedCounterCard label="Customers" value={stats.customers} icon={<FiUsers />} color="#6f4e37" />
              <AnimatedCounterCard label="Chefs" value={stats.chefs} icon={<FiCoffee />} color="#8b5e3c" />
              <AnimatedCounterCard label="Waiters" value={stats.waiters} icon={<FiUser />} color="#a67c52" />
              <AnimatedCounterCard label="Bookings" value={stats.bookings} icon={<FiCalendar />} color="#d4a574" />
              <AnimatedCounterCard label="Orders" value={stats.orders} icon={<FiMenu />} color="#b5651d" />
              <AnimatedCounterCard label="Earnings" value={`₹${stats.earnings}`} icon={<FiDollarSign />} color="#228b22" />
              <AnimatedCounterCard label="Feedback" value={stats.feedbackCount} icon={<FiMessageSquare />} color="#4682b4" />
              <AnimatedCounterCard label="Report Issues" value={stats.issueCount} icon={<FiAlertCircle />} color="#dc143c" />
            </div>
            <AdminStatsChart stats={stats} />
            <div className="summary-panel">
              <h3 className="summary-title">Coffee Shop Summary</h3>
              <div className="summary-grid">
                <div className="summary-item"><span className="summary-label">Total Staff</span><span className="summary-value">{stats.chefs + stats.waiters}</span></div>
                <div className="summary-item"><span className="summary-label">Total Bookings</span><span className="summary-value">{stats.bookings}</span></div>
                <div className="summary-item"><span className="summary-label">Active Today</span><span className="summary-value">{stats.customers}</span></div>
                <div className="summary-item"><span className="summary-label">Total Earnings</span><span className="summary-value">₹{stats.earnings}</span></div>
              </div>
            </div>
          </>
        );
      case "managing":
        return (
  <>
    <h1 className="welcome-title">MANAGING</h1>
    <div className="stats-cards">
      <div className="stat-card" onClick={() => setActiveSection("manage-customers")}>
        <div className="stat-value">{stats.customers}</div>
        <div className="stat-label">Customers</div>
      </div>
      <div className="stat-card" onClick={() => setActiveSection("manage-chefs")}>
        <div className="stat-value">{stats.chefs}</div>
        <div className="stat-label">Chefs</div>
      </div>
      <div className="stat-card" onClick={() => setActiveSection("manage-waiters")}>
        <div className="stat-value">{stats.waiters}</div>
        <div className="stat-label">Waiters</div>
      </div>
      <div className="stat-card" onClick={() => setActiveSection("manage-bookings")}>
        <div className="stat-value">{stats.bookings}</div>
        <div className="stat-label">Bookings</div>
      </div>
      <div className="stat-card" onClick={() => setActiveSection("manage-orders")}>
        <div className="stat-value">{stats.orders}</div>
        <div className="stat-label">Orders</div>
      </div>
      <div className="stat-card" onClick={() => setActiveSection("earnings")}>
        <div className="stat-value">₹{stats.earnings}</div>
        <div className="stat-label">Payments / Earnings</div>
      </div>
      <div className="stat-card" onClick={() => setActiveSection("manage-feedback")}>
        <div className="stat-value">{stats.feedbackCount}</div>
        <div className="stat-label">Feedback</div>
      </div>
      <div className="stat-card" onClick={() => setActiveSection("manage-issues")}>
        <div className="stat-value">{stats.issueCount}</div>
        <div className="stat-label">Report Issues</div>
      </div>
    </div>
    <AdminPieChart stats={stats} />
  </>
);

      case "manage-customers": return <AdminCustomerList />;
      case "manage-chefs": return <AdminChefList />;
      case "manage-waiters": return <AdminWaiterList />;
      case "manage-bookings": return <AdminBookingList />;
      case "manage-orders": return <AdminOrderList />;
      case "manage-feedback": return <AdminFeedbackList />;
      case "manage-issues": return <AdminIssueList />;
      case "earnings": return (<div className="panel-card"><h2 className="panel-title">TOTAL EARNINGS</h2><p className="earnings-value">₹{stats.earnings}</p></div>);
      case "add-staff": return <AdminUserForm />;
            case "add-item":
        return (
          <MenuForm
            onItemAdded={fetchMenu}
            editItem={editItem}
            clearEdit={() => setEditItem(null)}
          />
        );
      case "view-menu":
        return (
          <div className="menu-grid">
            {menuItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        );
      case "payments":
        return <AdminPaymentList />;
      case "user-table":
        return <AdminUserTable />;
      case "feedback":
        return <AdminFeedbackList />;
      case "issues":
        return <AdminIssueList />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-layout">
      {/* ✅ Particle background */}
      <Particles
        options={{
          background: { color: "#2e2e2e" },
          particles: {
            color: { value: "#ffffff" },
            links: { enable: true, color: "#aa9042" },
            move: { enable: true, speed: 2 },
            size: { value: 3 },
          },
        }}
      />

      {/* ✅ Sidebar with clean clickable items */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Coffee</h2>
        </div>
        <nav className="sidebar-nav">
          {SIDEBAR_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`sidebar-item ${activeSection === item.id ? "active" : ""}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* ✅ Scrollable main content */}
      <main className="main-content">
        <div className="content-wrapper">{renderSection()}</div>
      </main>
    </div>
  );
}

export default AdminDashboard;
