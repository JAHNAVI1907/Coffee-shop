// AnimatedCounterCard.jsx
import React, { useState, useEffect } from "react";
import "./Admin.css";

function AnimatedCounterCard({ label, value, icon, color }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 30;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="stat-card animated-card" style={{ borderLeft: `5px solid ${color}` }}>
      <div classIcon="animated-icon" style={{ color }}>
        {icon}
      </div>
      <div className="stat-value animated-count">{count}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default AnimatedCounterCard;