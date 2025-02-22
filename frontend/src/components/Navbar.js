// import React, { useState } from "react";
// import { Link } from "react-router-dom"; 
// import "./Navbar.css"; 

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <h1 className="logo">Extreme TC Intensity and Track Prediction</h1>
//         <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
//           ☰
//         </button>
//         <ul className={`nav-links ${isOpen ? "open" : ""}`}>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/about">About</Link></li> {/* Updated Link */}
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

//with admin login and reports button
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  // Predefined usernames for authentication
  const validUsernames = ["neel@666", "aniqa@520", "arpan@505"];

  const handleAdminLogin = () => {
    const username = prompt("Enter Admin Username:");
    if (username && validUsernames.includes(username)) {
      navigate("/upload"); // Redirect to Upload Page after login
    } else {
      alert("Invalid username. Access denied.");
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">CycloSity</h1>
        <p className="tagline">– Forecasting the Fury, Mitigating the Risk.</p>
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/predictions">Check Reports</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><button className="admin-btn" onClick={handleAdminLogin}>Login</button></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

