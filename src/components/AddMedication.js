import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, FormGroup, Input, Label, Row, Form } from "reactstrap";
import { updatePatient } from "../api";

function AddMedication() {
   const [medication, setMedication] = useState("");
   const { patientId } = useParams();
   const navigate = useNavigate();

   function handleMedicationChange(event) {
      setMedication(event.target.value);
   }

   async function handleSubmitForm(event) {
      event.preventDefault();
      await updatePatient(patientId, { medication });
      navigate(`/patient/${patientId}`);
   }
   return (
      <>
         <Form onSubmit={handleSubmitForm}>
            <Row>
               <Col md={6}>
                  <FormGroup>
                     <Label htmlFor="medication">Medication</Label>
                     <Input
                        id="medication"
                        type="textbox"
                        value={medication}
                        onChange={handleMedicationChange}
                     />
                  </FormGroup>
               </Col>
            </Row>
            <Button>Update Medication</Button>
         </Form>
      </>
   );
}

export default AddMedication;
