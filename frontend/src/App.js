// // import React from "react";
// // import UploadForm from "./components/UploadForm";
// // import "./App.css";

// // function App() {
// //   return (
// //     <div className="App">
// //       <h1>Extreme TC Intensity  and Track Prediction</h1>
// //       <UploadForm />
// //     </div>
// //   );
// // }

// // export default App;

// // import React from "react";
// // import UploadForm from "./components/UploadForm";
// // import "./App.css";
// // import stormGif from "./assets/storm.gif"; // Import GIF
// // import Navbar from "./components/Navbar";

// // function App() {
// //   return (
// //     <div
// //       className="App"
// //       style={{
// //         background: `url(${stormGif}) no-repeat center center fixed`,
// //         backgroundSize: "cover",
// //         minHeight: "100vh",
// //       }}
// //     >
// //       <Navbar/>
// //       <UploadForm />
// //     </div>
// //   );
// // }

// // export default App;

// //main code

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import UploadForm from "./components/UploadForm";
// import About from "./components/About"; // Import About Page
// import "./App.css";
// import stormGif from "./assets/storm.gif"; // Import GIF

// function App() {
//   return (
//     <Router>
//       <div
//         className="App"
//         style={{
//           background: `url(${stormGif}) no-repeat center center fixed`,
//           backgroundSize: "cover",
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<UploadForm />} />
//           <Route path="/about" element={<About />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

//storm gif in the side
// import React from "react";
// import UploadForm from "./components/UploadForm";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <h1>Extreme TC Intensity  and Track Prediction</h1>
//       <UploadForm />
//     </div>
//   );
// }

// export default App;

// import React from "react";
// import UploadForm from "./components/UploadForm";
// import "./App.css";
// import stormGif from "./assets/storm.gif"; // Import GIF
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <div
//       className="App"
//       style={{
//         background: `url(${stormGif}) no-repeat center center fixed`,
//         backgroundSize: "cover",
//         minHeight: "100vh",
//       }}
//     >
//       <Navbar/>
//       <UploadForm />
//     </div>
//   );
// }

// export default App;

//main code

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import UploadForm from "./components/UploadForm";
// import About from "./components/About"; // Import About Page
// import "./App.css";
// import stormGif from "./assets/storm.gif"; // Import GIF

// function App() {
//   return (
//     <Router>
//       <div
//         className="App"
//         style={{
//           background: `url(${stormGif}) no-repeat center center fixed`,
//           backgroundSize: "cover",
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<UploadForm />} />
//           <Route path="/about" element={<About />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

//storm gif in the side

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
import UploadForm from "./components/UploadForm";
import About from "./components/About"; 
import "./App.css";
import stormGif from "./assets/storm.gif"; 
//new 
import PredictionsPage from './components/PredictionPage';

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          background: `url(${stormGif}) no-repeat center center fixed`,
          backgroundSize: "cover",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
    {/* you can put navbar component here and remove it from the uploadForm */}
        <Routes>
          <Route path="/" element={<UploadForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/predictions" element={<PredictionsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;









