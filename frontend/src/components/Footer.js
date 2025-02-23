import React from "react";
import "../components/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} CycloSity. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
