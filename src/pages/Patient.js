import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { dischargePatient, getPatient } from "../api";
import { UserContext } from "../context/user.context";

function Patient() {
   const [patient, setPatient] = useState(null);
   const { patientId } = useParams();
   const navigate = useNavigate();
   const { loggedUser, getUserType } = useContext(UserContext);

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
   const type = getUserType(loggedUser);  // PROTECT OTHER ROUTES

   return patient ? (
      <>
         <h3>
            Patient {patient.firstName} {patient.lastName}
         </h3>
         <p>{patient.age} years old</p>
         <p>Medical background of {patient.personalMedicalHistory}</p>
         <p>Regular medication {patient.regularMedication}</p>
         <p>Patient admited with {patient.episode}</p>
         {!patient.alergies ? <p>Has alergies</p> : <p>No alergies known</p>}
         {patient.imageUrl && (
            <img
               src={patient.imageUrl}
               width="300"
               height="300"
               alt="patient"
            />
         )}
         {patient && patient.healthCarePlan ? (
            <div>this is the patient Health Care Plan</div>
         ) : type.isNurse ? (
            <Button onClick={() => navigate(`/interventions/${patientId}`)}>
               Add interventions to the Plan
            </Button>
         ) : (
            patient.healthCarePlan
         )}
         {patient && !patient.medication ? (
            <div>this is the patient medication {patient.medication}</div>
         ) : (
            <Button onClick={() => navigate(`/meds/${patientId}`)}>
               Add medication
            </Button>
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
               <p>Patient has skin integrity intact</p>
            )}
            <Link to={`/wound/${patientId}`}>
               <Button>Add a wound</Button>
            </Link>
         </div>
         <Button onClick={handleDischargePatient}>Discharge patient</Button>
      </>
   ) : (
      <Button>
         <Link to="../patient/admit">Admit Patient</Link>
      </Button>
   );
}

export default Patient;
