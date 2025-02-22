import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./PredictionPage.css"
import stormGif from "../assets/storm.gif";

const PredictionsPage = () => {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get('http://192.168.29.135:5000/predictions');
        // const response = await axios.get('http://192.168.53.121:5000/predictions');
        setPredictions(response.data);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      }
    };
    
    fetchPredictions();
  }, []);

  return (
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
  );
};

export default PredictionsPage;