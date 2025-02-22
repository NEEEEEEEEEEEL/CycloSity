// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../components/Home.css";
// import Navbar from "./Navbar";

// const Home = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
  
//   // Predefined usernames for authentication
//   const validUsernames = ["neel@666", "aniqa@520", "arpan@505"];

//   const handleAdminLogin = () => {
//     const username = prompt("Enter Admin Username:");
//     if (username && validUsernames.includes(username)) {
//       navigate("/upload");
//     } else {
//       setError("Invalid username. Access denied.");
//     }
//   };

//   return (
//     <>
//     <Navbar />
//     <div className="home-container">
//       <nav className="navbar">
//         <h1>Cyclone Prediction System</h1>
//         <div className="nav-buttons">
//           <button onClick={handleAdminLogin}>Admin</button>
//           <button onClick={() => navigate("/predictions")}>
//             Reports
//           </button>
//         </div>
//       </nav>
      
//       <div className="content">
//         <h2>Welcome to the Cyclone Prediction System</h2>
//         <p>Use this platform to analyze and predict cyclone intensity.</p>
//       </div>
      
//       {error && <p className="error-message">{error}</p>}
//     </div>
//     </>
//   );
// };

// export default Home;

//home page with only home functions
import React from "react";
import "../components/Home.css";
import Navbar from "./Navbar";
// import HomeBg from "../assets/pleasing.jpg";

const Home = () => {
  return (
    <>
      <Navbar />
      {/* <div className="about-page" style={{ backgroundImage: `url(${HomeBg})` }}></div> */}
      <div className="home-container">
        <div className="content">
          <h2>Welcome to the Cyclone Prediction System</h2>
          <p>Use this platform to analyze and predict cyclone intensity.</p>
        </div>
      </div>
    </>
  );
};

export default Home;
