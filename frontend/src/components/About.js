// import React from "react";
// import "./About.css"; 
// import backgroundImage from "../assets/about.jpg"; 
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// function About() {
//   return (
//     <>
//     <Navbar />
//     <div className="about-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
//       {/* Dark overlay for better text visibility */}
//       <div className="overlay"></div>

//       <div className="about-container">
//         <h1>🌪️ CycloSity – AI That Reads the Storm ⚡</h1>
//         <p>
//           When the ocean rages, **CycloSity** steps up.  
//           **AI-powered, precision-driven, and built for one mission:**  
//           **Predict tropical cyclone intensity before it’s too late.** ⏳  
//         </p>

//         <h2>⚙️ What Makes CycloSity a Game-Changer?</h2>
//         <ul>
//           <li>🌊 **Real-Time Intensity Forecasts** – AI estimates **Max Sustained Wind (MSW) & Central Pressure (ECP)** with razor-sharp accuracy.</li>
//           <li>🧠 **Deep Learning Powerhouse** – **LSTMs, Transformers, CNNs** trained on **thousands of satellite images**.</li>
//           <li>🔬 **XAI Transparency** – No black-box magic! **Grad-CAM highlights** what the AI sees.</li>
//           <li>⚡ **Speed & Reliability** – Because **every second counts** when extreme weather hits.</li>
//         </ul>

//         <h2>🚀 Built with Passion, Powered by Innovation 🌍</h2>
//         <p className="developers">
//           **Developed with ❤️ by** <strong>Debnil Sarkar, Aniqa Rahman, Arpan Saha, and Soumyajit Pal</strong>.  
//           Because **intensity matters** – and so does **getting it right**.  
//         </p>
//       </div>
//     </div>
//     <Footer />
//     </>
//   );
// }

// export default About;


//about us with cool image
import React from "react";
import "./About.css"; 
import backgroundImage from "../assets/about.jpg"; 
import Navbar from "./Navbar";
import Footer from "./Footer";

// Importing developer images
import debnilImg from "../assets/debnil.jpg";
import aniqaImg from "../assets/aniqa.jpg";
import arpanImg from "../assets/arpan.jpg";
// import soumyajitImg from "../assets/soumyajit.jpg";

const developers = [
  { name: "Debnil Sarkar", role: "Lead AI Engineer | Pushing the limits of AI & weather tech 🚀", img: debnilImg },
  { name: "Aniqa Rahman", role: "Data Scientist | Passionate about AI Ethics & Climate Tech 🌍", img: aniqaImg },
  { name: "Arpan Saha", role: "Software Architect | Full-Stack Dev & AI Enthusiast 🔥", img: arpanImg },
  // { name: "Soumyajit Pal", role: "ML Researcher | Big Data & AI Optimization Geek 📊", img: soumyajitImg },
];

function About() {
  return (
    <>
      <Navbar />
      <div className="about-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="overlay"></div>

        <div className="about-container">
          <h1 className="glow-text">🌪️ CycloSity – AI That Reads the Storm ⚡</h1>
          <p>
            When the ocean rages, <strong>CycloSity</strong> steps up.  
            <strong>AI-powered, precision-driven, and built for one mission:</strong>  
            <strong>Predict tropical cyclone intensity before it’s too late.⏳</strong>  
          </p>

          <h2>⚙️ What Makes CycloSity a Game-Changer?</h2>
          <ul>
            🌊 <strong>Real-Time Intensity Forecasts</strong> – AI estimates <strong>Max Sustained Wind (MSW) & Central Pressure (ECP)</strong> with precision.
            🧠 <strong>Deep Learning Powerhouse</strong> – <strong>LSTMs, Transformers, CNNs</strong> trained on <strong>thousands of satellite images</strong>.
            🔬 <strong>XAI Transparency</strong> – No black-box magic! <strong>Grad-CAM highlights</strong> what the AI sees.
            ⚡ <strong>Speed & Reliability</strong> – Because <strong>every second counts</strong> when extreme weather hits.
          </ul>

          <h2>🚀 Developed with ❤️, Powered by Innovation 🌍</h2>

          {/* Developer Section */}
          <div className="developer-section">
            {developers.map((dev, index) => (
              <div key={dev.name} className={`developer-container ${index % 2 === 0 ? "left" : "right"}`}>
                <div className="developer-card">
                  <img src={dev.img} alt={dev.name} className="developer-img" />
                </div>
                <div className="developer-info">
                  <h3>{dev.name}</h3>
                  <p>{dev.role}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;


