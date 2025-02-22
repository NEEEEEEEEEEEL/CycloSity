import React from "react";
import "./About.css"; 
import backgroundImage from "../assets/orange.jpg"; 
import Navbar from "./Navbar";

function About() {
  return (
    <>
    <Navbar />
    <div className="about-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Dark overlay for better text visibility */}
      <div className="overlay"></div>

      <div className="about-container">
        <h1>🌪️ CycloSity – AI That Reads the Storm ⚡</h1>
        <p>
          When the ocean rages, **CycloSity** steps up.  
          **AI-powered, precision-driven, and built for one mission:**  
          **Predict tropical cyclone intensity before it’s too late.** ⏳  
        </p>

        <h2>⚙️ What Makes CycloSity a Game-Changer?</h2>
        <ul>
          <li>🌊 **Real-Time Intensity Forecasts** – AI estimates **Max Sustained Wind (MSW) & Central Pressure (ECP)** with razor-sharp accuracy.</li>
          <li>🧠 **Deep Learning Powerhouse** – **LSTMs, Transformers, CNNs** trained on **thousands of satellite images**.</li>
          <li>🔬 **XAI Transparency** – No black-box magic! **Grad-CAM highlights** what the AI sees.</li>
          <li>⚡ **Speed & Reliability** – Because **every second counts** when extreme weather hits.</li>
        </ul>

        <h2>🚀 Built with Passion, Powered by Innovation 🌍</h2>
        <p className="developers">
          **Developed with ❤️ by** <strong>Debnil Sarkar, Aniqa Rahman, Arpan Saha, and Soumyajit Pal</strong>.  
          Because **intensity matters** – and so does **getting it right**.  
        </p>
      </div>
    </div>
    </>
  );
}

export default About;
