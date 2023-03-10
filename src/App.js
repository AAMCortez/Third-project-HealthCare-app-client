import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddIntervention from "./components/AddIntervention";
import AddMedication from "./components/AddMedication";
import IsPrivate from "./components/isPrivate";
import Navbar from "./components/Navbar";
import AddWound from "./pages/AddWound";
import AdmitPatient from "./pages/AdmitPatient";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Patient from "./pages/Patient";
import Signup from "./pages/Signup";

import { ChakraBaseProvider } from "@chakra-ui/react";

function App() {
   return (
      <div
         className="App"
         bg={`url(../../images/background.png) no-repeat center center fixed`}
         backgroundSize="cover"
         h="91vh"
      >
         
         <ChakraBaseProvider>
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

               <Route
                  path="/wound/:patientId"
                  element={
                     <IsPrivate>
                        <AddWound />
                     </IsPrivate>
                  }
               />
               <Route path="/patient/:patientId" element={<Patient />} />
               <Route
                  path="/meds/:patientId"
                  element={
                     <IsPrivate>
                        <AddMedication />
                     </IsPrivate>
                  }
               />
               <Route
                  path="/interventions/:patientId"
                  element={
                     <IsPrivate>
                        <AddIntervention />
                     </IsPrivate>
                  }
               />
            </Routes>
         </ChakraBaseProvider>
        
      </div>
   );
}

export default App;
