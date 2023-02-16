import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { admitPatient } from "../api";

function AdmitPatient() {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [birthdate, setBirthdate] = useState("");
   const [bed, setBed] = useState();
   const [personalMedicalHistory, setPersonalMedicalHistory] = useState("");
   const [regularMedication, setRegularMedication] = useState("");
   const [alergies, setAlergies] = useState(false);
   const [episode, setEpisode] = useState("");

   const navigate = useNavigate();

   function handleFirstNameChange(event) {
      setFirstName(event.target.value);
   }
   function handleLastNameChange(event) {
      setLastName(event.target.value);
   }
   function handleBirthdateChange(event) {
      setBirthdate(event.target.value);
   }
   function handleBedChange(event) {
      setBed(event.target.value);
   }
   function handlePersonalMedicalHistoryChange(event) {
      setPersonalMedicalHistory(event.target.value);
   }
   function handleRegularMedicationChange(event) {
      setRegularMedication(event.target.value);
   }
   function handleAlergiesChange(event) {
      setAlergies(event.target.value);
   }

   function handleEpisodeChange(event) {
      setEpisode(event.target.value);
   }

   async function handleSubmitForm(event) {
      event.preventDefault();
      console.log({
         firstName,
         lastName,
         birthdate,
         bed,
         personalMedicalHistory,
         regularMedication,
         alergies,
         episode,
      });
      await admitPatient({
         firstName,
         lastName,
         birthdate,
         bed,
         personalMedicalHistory,
         regularMedication,
         alergies,
         episode,
      });
      navigate("/");
   }

   return (
      <form onSubmit={handleSubmitForm}>
         <label htmlFor="firstName">First Name</label>
         <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
         />
         <label htmlFor="lastName">Last Name</label>
         <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
         />
         <label htmlFor="birthdate">Birthdate</label>
         <input
            id="birthdate"
            type="date"
            value={birthdate}
            onChange={handleBirthdateChange}
         />
         <label htmlFor="bed">Bed</label>
         <input id="bed" type="number" value={bed} onChange={handleBedChange} />
         <label htmlFor="personalMedicalHistory">Medical History</label>
         <input
            id="personalMedicalHistory"
            type="textbox"
            value={personalMedicalHistory}
            onChange={handlePersonalMedicalHistoryChange}
         />
         <label htmlFor="regularMedication">Regular Medication</label>
         <input
            id="regularMedication"
            type="text"
            value={regularMedication}
            onChange={handleRegularMedicationChange}
         />
         <label htmlFor="alergies">Alergies</label>
         <input
            id="alergies"
            type="select"
            value={alergies}
            onChange={handleAlergiesChange}
         />
         <label htmlFor="episode">Current Episode</label>
         <input
            id="episode"
            type="text"
            value={episode}
            onChange={handleEpisodeChange}
         />
         <button type="submit">Admit Patient</button>
      </form>
   );
}

export default AdmitPatient;
