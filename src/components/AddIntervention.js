import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, FormGroup, Input, Label, Row, Form } from "reactstrap";
import { updatePatient } from "../api";

function AddIntervention() {
   const [healthcarePlan, setHealthcarePlan] = useState("");
   const { patientId } = useParams();
   const navigate = useNavigate();

   function handleHealthcarePlanChange(event) {
      setHealthcarePlan(event.target.value);
   }

   async function handleSubmitForm(event) {
      event.preventDefault();
      await updatePatient(patientId, { healthcarePlan }); // pass patientId and healthcarePlan to updatePatient
      navigate(`/patient/${patientId}`);
   }
   return (
      <>
         <Form onSubmit={handleSubmitForm}>
            <Row>
               <Col md={6}>
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
