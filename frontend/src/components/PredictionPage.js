import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./PredictionPage.css"
import stormGif from "../assets/storm.gif";
import Footer from './Footer';
import Navbar from './Navbar';

const PredictionsPage = () => {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        // const response = await axios.get('https://f531-2405-201-800a-408e-a848-d3c0-2239-8e8.ngrok-free.app/predictions')
        const response = await axios.get('http://192.168.29.135:5000/predictions'); //my local ip wifi
        // const response = await axios.get('http://192.168.53.121:5000/predictions'); //my public ip mobile data
        setPredictions(response.data);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      }
    };
    
    fetchPredictions();
  }, []);

  return (
    <>
    <Navbar />
    <div 
      className="predictions-container" 
      style={{ backgroundImage: `url(${stormGif})`, backgroundSize: "cover" }}
    >
  
    <div className="predictions-page">
      <h2>Cyclone Reports</h2>
      <div className="predictions-grid">
        {predictions.map(prediction => (
          <div key={prediction.id} className="prediction-card">
            <div className="prediction-header">
              <h3>{prediction.location}</h3>
              <span className={`severity-badge ${prediction.severity}`}>
                {prediction.severity}
              </span>
            </div>
            <div className="prediction-details">
              <p><strong>ECP:</strong> {prediction.ecp.toFixed(2)} hPa</p>
              <p><strong>MSW:</strong> {((prediction.msw)* 1.852).toFixed(2)} km/h</p>
              <p><strong>Time:</strong> {new Date(prediction.timestamp).toLocaleString()}</p>
            </div>
            <div className="prediction-precautions">
              <h4>Precautions:</h4>
              <p>{prediction.precautions}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    <Footer />
    </>
  );
};

export default PredictionsPage;

//debug steps
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "./PredictionPage.css";
// import stormGif from "../assets/storm.gif";

// const PredictionsPage = () => {
//   const [predictions, setPredictions] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPredictions = async () => {
//       try {
//         const response = await axios.get(
//           "https://c2fd-2405-201-800a-408e-a848-d3c0-2239-8e8.ngrok-free.app/predictions",
//           { headers: { "Content-Type": "application/json" } }
//         );

//         console.log("Full Response:", response);
//         console.log("Response Data:", response.data, "Type:", typeof response.data);

//         if (Array.isArray(response.data)) {
//           const formattedData = response.data.map((prediction) => ({
//             ...prediction,
//             ecp: parseFloat(prediction.ecp).toFixed(2), // Format ECP
//             msw: (parseFloat(prediction.msw) * 1.852).toFixed(2), // Convert & format MSW
//             timestamp: new Date(prediction.timestamp).toLocaleString() // Convert timestamp
//           }));

//           setPredictions(formattedData);
//         } else {
//           console.error("API did not return an array. Received:", response.data);
//           setPredictions([]);
//           setError("Unexpected response format");
//         }
//       } catch (error) {
//         console.error("Error fetching predictions:", error);
//         setError("Failed to load predictions. Please try again later.");
//       }
//     };

//     fetchPredictions();
//   }, []);

//   return (
//     <div 
//       className="predictions-container" 
//       style={{ backgroundImage: `url(${stormGif})`, backgroundSize: "cover" }}
//     >
//       <div className="predictions-page">
//         <h2>Cyclone Reports</h2>

//         {error && <div className="error-message">{error}</div>}

//         <div className="predictions-grid">
//           {predictions.length === 0 && !error ? (
//             <p className="loading-message">Loading predictions...</p>
//           ) : (
//             predictions.map((prediction) => (
//               <div key={prediction.id} className="prediction-card">
//                 <div className="prediction-header">
//                   <h3>{prediction.location}</h3>
//                   <span className={`severity-badge ${prediction.severity}`}>
//                     {prediction.severity}
//                   </span>
//                 </div>
//                 <div className="prediction-details">
//                   <p><strong>ECP:</strong> {prediction.ecp} hPa</p>
//                   <p><strong>MSW:</strong> {prediction.msw} km/h</p>
//                   <p><strong>Time:</strong> {prediction.timestamp}</p>
//                 </div>
//                 <div className="prediction-precautions">
//                   <h4>Precautions:</h4>
//                   <p>{prediction.precautions}</p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PredictionsPage;

