import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../components/DatabasePage.css"

const DatabasePage = () => {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState("");

  // Fetch predictions
  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/database");
      // const response = await axios.get('https://c2fd-2405-201-800a-408e-a848-d3c0-2239-8e8.ngrok-free.app/database')
      setPredictions(response.data);
    } catch (err) {
      setError("Error fetching data");
      console.error(err);
    }
  };

  // Delete prediction
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/database/${id}`);
      setPredictions(predictions.filter((pred) => pred.id !== id));
    } catch (err) {
      setError("Error deleting entry");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Prediction Records</h2>
        {error && <p className="error">{error}</p>}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Timestamp</th>
              <th>ECP (hPa)</th>
              <th>MSW (km/h)</th>
              <th>Precautions</th>
              <th>Location</th>
              <th>Severity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((pred) => (
              <tr key={pred.id}>
                <td>{pred.id}</td>
                <td>{new Date(pred.timestamp).toLocaleString()}</td>
                <td>{pred.ecp}</td>
                <td>{(pred.msw * 1.852).toFixed(2)}</td>
                <td>{pred.precautions}</td>
                <td>{pred.location}</td>
                <td>{pred.severity}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(pred.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DatabasePage;
