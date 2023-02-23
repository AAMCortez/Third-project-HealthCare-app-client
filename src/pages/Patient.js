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
   const type = getUserType(loggedUser); // PROTECT OTHER ROUTES

   return patient ? (
      <>
         <h3>
            Patient {patient.firstName} {patient.lastName}
         </h3>
         <p>{patient.age} years old</p>
         <p>Medical background of {patient.personalMedicalHistory}</p>
         <p>Regular medication {patient.regularMedication}</p>
         <p>Patient admited with {patient.episode}</p>
         {!patient.alergies ? <p>Patient has allergies to: {patient.alergiesSpecification}</p> : <p>No allergies known</p>}
         {patient.imageUrl && (
            <img
               src={patient.imageUrl}
               width="300"
               height="300"
               alt="patient"
            />
         )}
         {patient && patient.healthcarePlan ? (
            <div>
               <h4>Patient Health Care Plan</h4>
               {patient.healthcarePlan.map((intervention) => {
                  return <p key={intervention}>{intervention}</p>;
               })}
            </div>
         ) : null}

         {patient && patient.medication ? (
            <div>
               <h4>Patient Medication</h4>
               {patient.medication.map((meds) => {
                  return <p key={meds}>{meds}</p>;
               })}
            </div>
         ) : null}

         {type.isNurse && (
            <Button onClick={() => navigate(`/interventions/${patientId}`)}>
               Add interventions to the Plan
            </Button>
         )}

         {type.isDr && (
            <Button onClick={() => navigate(`/meds/${patientId}`)}>
               Add medication
            </Button>
         )}

         <div>
            {patient.wound.length > 0 ? (
               <>
                  <h4>
                     {patient.firstName} {patient.lastName} Wounds:
                  </h4>
                  {patient.wound.map((wound) => {
                     return (
                        <div key={wound._id}>
                        {wound.pictureUrl && <img src={wound.pictureUrl} width="300" height="300" alt="wound" />}
                           <p>{wound.description}</p>
                           <p>{wound.treatment}</p>
                        </div>
                     );
                  })}
               </>
            ) : (
               <p>Patient has skin integrity intact</p>
            )}
            {loggedUser ? (
               <Link to={`/wound/${patientId}`}>
                  <Button>Add a wound</Button>
               </Link>
            ) : null}
         </div>
         {loggedUser ? (
            <Button onClick={handleDischargePatient}>Discharge patient</Button>
         ) : null}
      </>
   ) : (
      <Link to="../patient/admit">
         <Button>Admit Patient </Button>
      </Link>
   );
}

export default Patient;
