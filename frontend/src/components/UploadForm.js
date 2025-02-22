// import React, { useState } from "react";
// import axios from "axios";
// import "../style.css"; 

// const UploadImages = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [previewURLs, setPreviewURLs] = useState([]);
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState("");

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);

//     if (files.length !== 6) {
//       setError("Please select exactly 6 images.");
//       setSelectedFiles([]); //resets the selected files
//       setPreviewURLs([]); 
//       return;
//     }

//     setSelectedFiles(files);
//     setPreviewURLs(files.map((file) => URL.createObjectURL(file)));
//     setError("");
//   };

//   const handleUpload = async () => {
//     if (selectedFiles.length !== 6) {
//       setError("You must upload 6 images.");
//       return;
//     }

//     const formData = new FormData();
//     selectedFiles.forEach((file) => formData.append("files", file));

//     try {
//       const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setPrediction(response.data);
//       setError(""); 
//     } catch (err) {
//       setError("Error processing request. Ensure the backend is running.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="upload-container">
//       <h2>Upload 6 Satellite Images</h2>
//       <input type="file" multiple accept="image/*" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={selectedFiles.length !== 6}>
//         Predict
//       </button>

//       {error && <p className="error-message">{error}</p>}

//       {previewURLs.length > 0 && (
//         <div className="image-preview-container">
//           {previewURLs.map((src, index) => (
//             <img key={index} src={src} alt={`preview-${index}`} />
//           ))}
//         </div>
//       )}

//       {prediction && (
//         <div className="prediction-result">
//           <h3>Prediction:</h3>
//           <p><b>ECP:</b> {parseFloat(prediction.ECP).toFixed(2)}</p>
//           <p><b>MSW:</b> {parseFloat(prediction.MSW).toFixed(2)}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadImages;

//grad-cam visualization
// import React, { useState } from "react";
// import axios from "axios";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import "../style.css";

// const UploadImages = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [previewURLs, setPreviewURLs] = useState([]);
//   const [prediction, setPrediction] = useState(null);
//   const [gradcamImages, setGradcamImages] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);

//     if (files.length !== 6) {
//       setError("Please select exactly 6 images.");
//       setSelectedFiles([]);
//       setPreviewURLs([]);
//       return;
//     }

//     setSelectedFiles(files);
//     setPreviewURLs(files.map((file) => URL.createObjectURL(file)));
//     setError("");
//   };

//   const handleUpload = async () => {
//     if (selectedFiles.length !== 6) {
//       setError("You must upload 6 images.");
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     selectedFiles.forEach((file) => formData.append("files", file));

//     try {
//       const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setPrediction({
//         ECP: response.data.ECP,
//         MSW: response.data.MSW,
//       });
//       setGradcamImages(response.data.gradcam);
//       setError("");
//     } catch (err) {
//       setError("Error processing request. Ensure the backend is running.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="upload-container">
//       <h2>Upload 6 Satellite Images</h2>
//       <input type="file" multiple accept="image/*" onChange={handleFileChange} disabled={loading} />
//       <button onClick={handleUpload} disabled={selectedFiles.length !== 6 || loading}>
//         {loading ? "Processing..." : "Predict"}
//       </button>

//       {error && <p className="error-message">{error}</p>}

//       {previewURLs.length > 0 && (
//         <div className="image-preview-container">
//           {previewURLs.map((src, index) => (
//             <img key={index} src={src} alt={`preview-${index}`} />
//           ))}
//         </div>
//       )}

//       {prediction && (
//         <div className="prediction-result">
//           <h3>Prediction Results:</h3>
//           <div className="meter-container">
//             <div className="meter">
//               <CircularProgressbar
//                 value={parseFloat(prediction.ECP)}
//                 text={`${parseFloat(prediction.ECP).toFixed(2)}`}
//                 styles={buildStyles({
//                   textSize: "20px",
//                   pathColor: "#3498db",
//                   textColor: "black",
//                   trailColor: "#e0e0e0",
//                 })}
//               />
//               <p>ECP</p>
//             </div>
//             <div className="meter">
//               <CircularProgressbar
//                 value={parseFloat(prediction.MSW)}
//                 text={`${parseFloat(prediction.MSW).toFixed(2)}`}
//                 styles={buildStyles({
//                   textSize: "20px",
//                   pathColor: "#e74c3c",
//                   textColor: "black",
//                   trailColor: "#e0e0e0",
//                 })}
//               />
//               <p>MSW</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {gradcamImages && (
//         <div className="gradcam-container">
//           <h3>Grad-CAM Visualization:</h3>
//           <div className="gradcam-images">
//             <div className="gradcam-image">
//               <h4>Original Image</h4>
//               <img src={`data:image/png;base64,${gradcamImages.original}`} alt="Original" />
//             </div>
//             <div className="gradcam-image">
//               <h4>Heatmap</h4>
//               <img src={`data:image/png;base64,${gradcamImages.heatmap}`} alt="Heatmap" />
//             </div>
//             <div className="gradcam-image">
//               <h4>Overlay</h4>
//               <img src={`data:image/png;base64,${gradcamImages.overlay}`} alt="Overlay" />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadImages;

//grad-cam with publish feature visualization
import React, { useState } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../style.css";
import PublishForm from './PublishForm';
import Navbar from "./Navbar";
import uploadBg from "../assets/megh.jpg"

const UploadImages = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [gradcamImages, setGradcamImages] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length !== 6) {
      setError("Please select exactly 6 images.");
      setSelectedFiles([]);
      setPreviewURLs([]);
      return;
    }

    setSelectedFiles(files);
    setPreviewURLs(files.map((file) => URL.createObjectURL(file)));
    setError("");
  };

  const handleUpload = async () => {
    if (selectedFiles.length !== 6) {
      setError("You must upload 6 images.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPrediction({
        ECP: response.data.ECP,
        MSW: response.data.MSW,
      });
      setGradcamImages(response.data.gradcam);
      setError("");
    } catch (err) {
      setError("Error processing request. Ensure the backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div 
      className="bg-img" 
      style={{ backgroundImage: `url(${uploadBg})`, backgroundSize: "cover" }}
    >
    <div className="upload-container">
      <h2>Upload 6 Satellite Images</h2>
      <input type="file" multiple accept="image/*" onChange={handleFileChange} disabled={loading} />
      <button onClick={handleUpload} disabled={selectedFiles.length !== 6 || loading}>
        {loading ? "Processing..." : "Predict"}
      </button>

      {error && <p className="error-message">{error}</p>}

      {previewURLs.length > 0 && (
        <div className="image-preview-container">
          {previewURLs.map((src, index) => (
            <img key={index} src={src} alt={`preview-${index}`} />
          ))}
        </div>
      )}

{prediction && (
  <div className="prediction-result">
    <h3>Prediction Results:</h3>
    <div className="meter-container">
      <div className="meter">
        <CircularProgressbar
          value={parseFloat(prediction.ECP)}
          text={`${parseFloat(prediction.ECP).toFixed(2)} hPa`}
          styles={buildStyles({
            textSize: "15px",
            pathColor: "#3498db",
            textColor: "black",
            trailColor: "#e0e0e0",
          })}
        />
        <p>ECP</p>
      </div>
      <div className="meter">
        <CircularProgressbar
          value={parseFloat(prediction.MSW)* 1.852}
          text={`${(parseFloat(prediction.MSW)* 1.852).toFixed(2)} Km/h`}
          styles={buildStyles({
            textSize: "15px",
            pathColor: "#e74c3c",
            textColor: "black",
            trailColor: "#e0e0e0",
          })}
        />
        <p>MSW</p>
      </div>
    </div>
    {/* publish form */}
    <PublishForm prediction={prediction} />
  </div>
)}
      {gradcamImages && (
        <div className="gradcam-container">
          <h3>Grad-CAM Visualization:</h3>
          <div className="gradcam-images">
            <div className="gradcam-image">
              <h4>Original Image</h4>
              <img src={`data:image/png;base64,${gradcamImages.original}`} alt="Original" />
            </div>
            <div className="gradcam-image">
              <h4>Heatmap</h4>
              <img src={`data:image/png;base64,${gradcamImages.heatmap}`} alt="Heatmap" />
            </div>
            <div className="gradcam-image">
              <h4>Overlay</h4>
              <img src={`data:image/png;base64,${gradcamImages.overlay}`} alt="Overlay" />
            </div>
          </div>
        </div>
      )}
    </div>
    </div> 
    </>
  );
};

export default UploadImages;






