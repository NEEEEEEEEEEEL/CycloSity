import React, { useState } from 'react';
import axios from 'axios';
import "./PublishForm.css"


const PublishForm = ({ prediction }) => {
  const [formData, setFormData] = useState({
    location: '',
    severity: 'moderate',
    precautions: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/publish', {
        ecp: prediction.ECP,
        msw: prediction.MSW,
        ...formData
      });
      setMessage('Prediction published successfully!');
      // Clear form
      setFormData({
        location: '',
        severity: 'moderate',
        precautions: ''
      });
    } catch (error) {
      setMessage('Error publishing prediction');
      console.error('Error:', error);
    }
  };

  return (
    <div className="publish-container">
      <h3>Publish Prediction</h3>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Severity Level:</label>
          <select
            value={formData.severity}
            onChange={(e) => setFormData({...formData, severity: e.target.value})}
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
            <option value="severe">Severe</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Precautions:</label>
          <textarea
            value={formData.precautions}
            onChange={(e) => setFormData({...formData, precautions: e.target.value})}
            required
            rows="4"
          />
        </div>
        
        <button type="submit" className="publish-button">
          Publish Prediction
        </button>
      </form>
    </div>
  );
};

export default PublishForm;