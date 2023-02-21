import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
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
            {patient.firstName} {patient.lastName}
         </h3>
         <p>{patient.episode}</p>
         <p>Age: {patient.age} years</p>
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
         <div>
            {patient && patient.wound ? (
               <>
                  <h4>
                      {patient.firstName} {patient.lastName} Wounds:
                  </h4>
                  {patient.wound.map((wound) => {
                     return (
                        <div key={wound._id}>
                           <p>{wound.pictureUrl}</p>
                           <p>{wound.description}</p>
                           <p>{wound.treatment}</p>
                        </div>
                     );
                  })}
               </>
            ) : (
               <p>no wound</p>
            )}
            <Link to={`/wound/${patientId}`}>Add a wound</Link>
         </div>
         <Button onClick={handleDischargePatient}>Discharge patient</Button>
      </>
   ) : (
      <Link to="../patient/admit">Admit Patient</Link>
   );
}

export default Patient;
