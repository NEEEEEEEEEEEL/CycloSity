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
// import React from "react";
// import "../components/Home.css";
// import Navbar from "./Navbar";
// import HomeBg from "../assets/background.jpg";

// const Home = () => {
//   return (
//     <>
//       <Navbar />
//       {/* {<div className="about-page" style={{ backgroundImage: `url(${HomeBg})` }}></div> } */}
//       <div className="home-container" style={{ backgroundImage: `url(${HomeBg})`}}>
//         <div className="content">
//           <h2>Welcome to the Cyclone Prediction System</h2>
//           <p>Use this platform to analyze and predict cyclone intensity.</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;


//new home
// import React from "react";
// import "../components/Home.css";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// // import HomeBg from "../assets/background.jpg";

// const Home = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="home-container">
//         <div className="content">
//           <h2>CycloSity</h2>
//           <p>Stay ahead of the storm – Predict. Prepare. Protect. 🌪️⚡</p>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Home;


//cyclone lab
// "https://api.open-meteo.com/v1/forecast?latitude=22.57&longitude=88.36&current=temperature_2m,wind_speed_10m,pressure_msl&timezone=Asia/Kolkata"

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../components/Home.css";
import { motion } from "framer-motion";
import { WiStrongWind, WiThermometer, WiBarometer } from "react-icons/wi";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=22.57&longitude=88.36&current=temperature_2m,wind_speed_10m,pressure_msl&timezone=Asia/Kolkata"
        );
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("Weather API Response:", data); // Debugging log
    
        if (data.current) {
          setWeatherData({
            temperature: `${data.current.temperature_2m}°C`,
            windSpeed: `${data.current.wind_speed_10m} km/h`,
            pressure: `${data.current.pressure_msl} hPa`, // Corrected pressure key
          });
        } else {
          throw new Error("Unexpected API response structure");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    
    
    fetchWeatherData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="content">
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            CycloSity
          </motion.h2>
          <p>Decode the storm before it strikes – Predict. Prepare. Protect. 🌪️⚡</p>
          </div>
          <div class="cyclone-info">
    <h2 class="cyclone-title">Tropical Cyclone: A Powerful Storm System</h2>
    <p class="cyclone-description">
        A tropical cyclone is an intense circular storm that forms over warm ocean waters, 
        characterized by strong winds, heavy rainfall, and a low-pressure center.
    </p>
    <h3 class="cyclone-subtitle">Notable Cyclones in the Bay of Bengal</h3>
    <ul class="cyclone-list">
        <li><strong class="cyclone-name">Cyclone Amphan (2020):</strong> A super cyclonic storm that caused severe damage in West Bengal and Bangladesh.</li>
        <li><strong class="cyclone-name">Cyclone Fani (2019):</strong> One of the strongest pre-monsoon cyclones to hit Odisha, with winds reaching 250 km/h.</li>
        <li><strong class="cyclone-name">Cyclone Phailin (2013):</strong> A powerful cyclone that led to massive evacuations in Odisha and Andhra Pradesh.</li>
    </ul>
</div>


          {/* Real-time Weather Data */}
      <div className="weather-container">
        {loading ? (
          <p>Loading weather data...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <div className="weather-card">
              <WiThermometer className="weather-icon red" />
              <div>
                <p>{weatherData.temperature}</p>
              </div>
            </div>
            <div className="weather-card">
              <WiStrongWind className="weather-icon blue" />
              <div>
                {/* <h2>Wind</h2> */}
                <p>{weatherData.windSpeed}</p>
              </div>
            </div>
            <div className="weather-card">
              <WiBarometer className="weather-icon green" />
              <div>
                {/* <h2>Press.</h2> */}
                <p>{weatherData.pressure}</p>
              </div>
            </div>
          </>
        )}
      </div>
        </div>
      
      <Footer />
    </>
  );
};

export default Home;



