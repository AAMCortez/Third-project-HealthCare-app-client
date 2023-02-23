import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Col, FormGroup, Input, Label, Row, Form } from "reactstrap";
import { addWound, uploadImage } from "../api";

function AddWound() {
   const [pictureUrl, setPictureUrl] = useState("");
   const [description, setDescription] = useState("");
   const [treatment, setTreatment] = useState("");
   const { patientId } = useParams();
   const navigate = useNavigate();

   function handleDescriptionChange(event) {
      setDescription(event.target.value);
   }
   function handleTreatment(event) {
      setTreatment(event.target.value);
   }
   function handleImageSelect(event) {
      setPictureUrl(event.target.files[0]);
   }
   async function handleSubmitForm(event) {
      event.preventDefault();
      const uploadData = new FormData();
      uploadData.append("filename", pictureUrl);
      const response = await uploadImage(uploadData);
      console.log("response from BE with image Url", response.data);
      await addWound({
         pictureUrl: response.data.fileUrl,
         description,
         treatment,
         patientId,
      });
      toast.success("Wound added");
      navigate(`/patient/${patientId}`);
   }
   return (
      <>
         <Form onSubmit={handleSubmitForm}>
            <Row>
               <Col md={3}>
                  <FormGroup>
                     <Label htmlFor="image"></Label>
                     <Input
                        id="image"
                        type="file"
                        onChange={handleImageSelect}
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
