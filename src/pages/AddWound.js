import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, FormGroup, Input, Label, Row, Form } from "reactstrap";
import { addWound } from "../api";

function AddWound() {
   const [pictureUrl, setPictureUrl] = useState("");
   const [description, setDescription] = useState("");
   const [treatment, setTreatment] = useState("");
   const { patientId } = useParams();
   const navigate = useNavigate();

   function handlePictureUrlChange(event) {
      setPictureUrl(event.target.value);
   }
   function handleDescriptionChange(event) {
      setDescription(event.target.value);
   }
   function handleTreatment(event) {
      setTreatment(event.target.value);
   }
   async function handleSubmitForm(event) {
      event.preventDefault();
      await addWound({ pictureUrl, description, treatment, patientId });
      navigate(`/patient/${patientId}`)
   }
   return (
      <>
         <Form onSubmit={handleSubmitForm}>
            <Row>
               <Col md={3}>
                  <FormGroup>
                     <Label htmlFor="pictureUrl">Image</Label>
                     <Input
                        id="pictureUrl"
                        type="text"
                        value={pictureUrl}
                        onChange={handlePictureUrlChange}
                     />
                  </FormGroup>
               </Col>
               <Col md={3}>
                  <FormGroup>
                     <Label htmlFor="description">Description</Label>
                     <Input
                        id="description"
                        type="textbox"
                        value={description}
                        onChange={handleDescriptionChange}
                     />
                  </FormGroup>
               </Col>
               <Col md={2}>
                  <FormGroup>
                     <Label htmlFor="treatment">Treatment</Label>
                     <Input
                        id="treatment"
                        type="textbox"
                        value={treatment}
                        onChange={handleTreatment}
                     />
                  </FormGroup>
               </Col>
            </Row>

            <Button>Add Wound</Button>
         </Form>
      </>
   );
}

export default AddWound;
