import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AdmitPatient from "./pages/AdmitPatient";
import Home from "./pages/Home";
import Patient from "./pages/Patient";

function App() {
   return (
      <div className="App">
         <Navbar />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Home />} />
            <Route path="/signup" element={<Home />} />
            <Route path="/patient/admit" element={<AdmitPatient />} />
            <Route path="/patient/:patientId" element={<Patient />} />
         </Routes>
      </div>
   );
}

export default App;
