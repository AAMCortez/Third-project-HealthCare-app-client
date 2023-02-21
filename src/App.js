import { Route, Routes } from "react-router-dom";
import "./App.css";
import IsPrivate from "./components/isPrivate";
import Navbar from "./components/Navbar";
import AddWound from "./pages/AddWound";
import AdmitPatient from "./pages/AdmitPatient";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Patient from "./pages/Patient";
import Signup from "./pages/Signup";

function App() {
   return (
      <div className="App">
         <Navbar />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
               path="/patient/admit"
               element={
                  <IsPrivate>
                     <AdmitPatient />
                  </IsPrivate>
               }
            />
            <Route path="/wound/:patientId" element={<AddWound />} />
            <Route path="/patient/:patientId" element={<Patient />} />
         </Routes>
      </div>
   );
}

export default App;
