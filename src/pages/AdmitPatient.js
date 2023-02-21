import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, FormGroup, Input, Label, Row, Form } from "reactstrap";
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
   // function addPersonalMedical(){
   //    onkeydown()    WHEN DONE ADD KEYDOWN EVENT TO UPDATE AND PUSH AN ARRAY OF DISEASES

   //    }
   // }

   function handleRegularMedicationChange(event) {
      setRegularMedication(event.target.value);
   }
   function handleAlergiesChange(event) {
      setAlergies(event.target.checked);
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
      <>
         <Form onSubmit={handleSubmitForm}>
            <Row>
               <Col md={3}>
                  <FormGroup>
                     <Label htmlFor="firstName">First Name</Label>
                     <Input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={handleFirstNameChange}
                     />
                  </FormGroup>
               </Col>
               <Col md={3}>
                  <FormGroup>
                     <Label htmlFor="lastName">Last Name</Label>
                     <Input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={handleLastNameChange}
                     />
                  </FormGroup>
               </Col>
               <Col md={2}>
                  <FormGroup>
                     <Label htmlFor="birthdate">Birthdate</Label>
                     <Input
                        id="birthdate"
                        type="date"
                        value={birthdate}
                        onChange={handleBirthdateChange}
                     />
                  </FormGroup>
               </Col>
               <Col md={1}>
                  <FormGroup>
                     <Label htmlFor="bed">Bed</Label>
                     <Input
                        id="bed"
                        type="number"
                        value={bed}
                        onChange={handleBedChange}
                     />
                  </FormGroup>
               </Col>
            </Row>

            <Row>
               <Col md={5}>
                  <FormGroup>
                     <Label htmlFor="personalMedicalHistory">
                        Medical History
                     </Label>
                     <Input
                        id="personalMedicalHistory"
                        type="textbox"
                        value={personalMedicalHistory}
                        onChange={handlePersonalMedicalHistoryChange}
                     />
                  </FormGroup>
               </Col>
               <Col md={4}>
                  <FormGroup>
                     <Label htmlFor="regularMedication">
                        Regular Medication
                     </Label>
                     <Input
                        id="regularMedication"
                        type="text"
                        value={regularMedication}
                        onChange={handleRegularMedicationChange}
                     />
                  </FormGroup>
                  <FormGroup check>
                     <Input
                        id="alergies"
                        type="checkbox"
                        value={alergies}
                        onChange={handleAlergiesChange}
                     />
                     <Label htmlFor="alergies">Alergies</Label>
                  </FormGroup>
               </Col>
               <Col md={6}>
                  <FormGroup>
                     <Label htmlFor="episode">Current Episode</Label>
                     <Input
                        id="episode"
                        type="text"
                        value={episode}
                        onChange={handleEpisodeChange}
                     />
                  </FormGroup>
               </Col>
            </Row>

            <Button>Admit Patient</Button>
         </Form>
      </>
   );
}

export default AdmitPatient;
