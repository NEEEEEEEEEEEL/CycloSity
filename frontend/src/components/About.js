import React from "react";
import "./About.css"; // Ensure this file is correctly imported

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About Extreme TC Prediction 🌀</h1>
        <p>
          This web application predicts extreme tropical cyclone intensity and track 
          using deep learning models trained on satellite imagery and weather data. 
          It helps in early detection and analysis of cyclones to mitigate risks. 🐱
        </p>
        
        <h2>Key Features: 🐾</h2>
        <ul>
          <li>🌍 Real-time satellite image processing</li>
          <li>🌪 Predicts Maximum Sustained Wind (MSW) & Estimated Central Pressure (ECP)</li>
          <li>🧠 Powered by LSTM, Transformer & CNN models</li>
          <li>📊 Visual explanations using Grad-CAM for interpretability</li>
          <li>⚡ Fast and efficient cyclone intensity estimation</li>
        </ul>

        <p className="developers">Developed with ❤️ by Debnil Sarkar, Aniqa Rahman & Arpan Saha</p>
      </div>
    </div>
  );
}

export default About;
