import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "./Navbar.css"; 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">Extreme TC Intensity and Track Prediction</h1>
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li> {/* Updated Link */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
