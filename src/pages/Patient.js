import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dischargePatient, getPatient } from "../api";

function Patient() {
   const [patient, setPatient] = useState(null);
   const { patientId } = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      async function handlePatientDetail() {
         const response = await getPatient(patientId);
         setPatient(response.data);
      }
      handlePatientDetail();
   }, [patientId]);

   async function handleDischargePatient() {
      await dischargePatient(patientId);
      navigate("/");
   }

   return patient ? (
      <>
         <h3>
            {patient.firstName}
            {patient.lastName}
         </h3>
         <p>{patient.episode}</p>
         <p>{patient.age}</p>
         <p>{patient.personalMedicalHistory}</p>
         <p>{patient.regularMedication}</p>
         {patient.alergies ? <p>yes</p> : <p>no</p>}
         {patient.imageUrl && (
            <img
               src={patient.imageUrl}
               width="300"
               height="300"
               alt="patient"
            />
         )}
         <button onClick={handleDischargePatient}>Discharge patient</button>
      </>
   ) : (
      <Link to="../patient/admit">Admit Patient</Link>
   );
}

export default Patient;
