import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, FormGroup, Input, Label, Row, Form } from "reactstrap";
import { updatePatient } from "../api";

function AddIntervention() {
   const [medication, setMedication] = useState("");
   const [healthcarePlan, setHealthcarePlan] = useState("");
   const { patientId } = useParams();
   const navigate = useNavigate();

   function handleMedicationChange(event) {
    setMedication(event.target.value);
   }
   function handleHealthcarePlanChange(event) {
    setHealthcarePlan(event.target.value);
   }

   async function handleSubmitForm(event) {
      event.preventDefault();
      await updatePatient({ medication, healthcarePlan });
      navigate(`/patient/${patientId}`);
   }
   return (
      <>
         <Form onSubmit={handleSubmitForm}>
            <Row>
               <Col md={3}>
                  <FormGroup>
                     <Label htmlFor="medication">Medication</Label>
                     <Input
                        id="medication"
                        type="text"
                        value={medication}
                        onChange={handleMedicationChange}
                     />
                  </FormGroup>
               </Col>
               <Col md={3}>
                  <FormGroup>
                     <Label htmlFor="healthcarePlan">Interventions</Label>
                     <Input
                        id="healthcarePlan"
                        type="textbox"
                        value={healthcarePlan}
                        onChange={handleHealthcarePlanChange}
                     />
                  </FormGroup>
               </Col>
            </Row>

            <Button>Update Plan</Button>
         </Form>
      </>
   );
}

export default AddIntervention;
