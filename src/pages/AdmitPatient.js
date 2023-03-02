import {
   Box,
   Button,
   Checkbox,
   Flex,
   FormControl,
   FormLabel,
   Input,
   Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Button, Col, FormGroup, Input, Label, Row, Form } from "reactstrap";
import { admitPatient } from "../api";

function AdmitPatient() {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [birthdate, setBirthdate] = useState("");
   const [bed, setBed] = useState();
   const [personalMedicalHistory, setPersonalMedicalHistory] = useState("");
   const [regularMedication, setRegularMedication] = useState("");
   const [alergies, setAlergies] = useState(false);
   const [alergiesSpecification, setAlergiesSpecification] = useState("");
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
   function handleAlergiesSpecificationChange(event) {
      setAlergiesSpecification(event.target.value);
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
         alergiesSpecification,
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
         alergiesSpecification,
         episode,
      });
      navigate("/");
   }

   return (
      // <>
      //    <Form onSubmit={handleSubmitForm}>
      //       <Row>
      //          <Col md={3}>
      //             <FormGroup>
      //                <Label htmlFor="firstName">First Name</Label>
      //                <Input
      //                   id="firstName"
      //                   type="text"
      //                   value={firstName}
      //                   onChange={handleFirstNameChange}
      //                />
      //             </FormGroup>
      //          </Col>
      //          <Col md={3}>
      //             <FormGroup>
      //                <Label htmlFor="lastName">Last Name</Label>
      //                <Input
      //                   id="lastName"
      //                   type="text"
      //                   value={lastName}
      //                   onChange={handleLastNameChange}
      //                />
      //             </FormGroup>
      //          </Col>
      //          <Col md={2}>
      //             <FormGroup>
      //                <Label htmlFor="birthdate">Birthdate</Label>
      //                <Input
      //                   id="birthdate"
      //                   type="date"
      //                   value={birthdate}
      //                   onChange={handleBirthdateChange}
      //                />
      //             </FormGroup>
      //          </Col>
      //          <Col md={1}>
      //             <FormGroup>
      //                <Label htmlFor="bed">Bed</Label>
      //                <Input
      //                   id="bed"
      //                   type="number"
      //                   value={bed}
      //                   onChange={handleBedChange}
      //                />
      //             </FormGroup>
      //          </Col>
      //       </Row>

      //       <Row>
      //          <Col md={5}>
      //             <FormGroup>
      //                <Label htmlFor="personalMedicalHistory">
      //                   Medical History
      //                </Label>
      //                <Input
      //                   id="personalMedicalHistory"
      //                   type="textbox"
      //                   value={personalMedicalHistory}
      //                   onChange={handlePersonalMedicalHistoryChange}
      //                />
      //             </FormGroup>
      //          </Col>
      //          <Col md={4}>
      //             <FormGroup>
      //                <Label htmlFor="regularMedication">
      //                   Regular Medication
      //                </Label>
      //                <Input
      //                   id="regularMedication"
      //                   type="text"
      //                   value={regularMedication}
      //                   onChange={handleRegularMedicationChange}
      //                />
      //             </FormGroup>
      //             <FormGroup check>
      //                <Input
      //                   id="alergies"
      //                   type="checkbox"
      //                   value={alergies}
      //                   onChange={handleAlergiesChange}
      //                />
      //                <Label htmlFor="alergies">Allergies</Label>
      //             </FormGroup>
      //          </Col>
      //          {alergies && (
      //             <Col md={8}>
      //                <FormGroup>
      //                   <Label htmlFor="alergiesSpecification">Allergy Specification:</Label>
      //                   <Input
      //                      id="alergiesSpecification"
      //                      type="text"
      //                      value={alergiesSpecification}
      //                      onChange={handleAlergiesSpecificationChange}
      //                   />
      //                </FormGroup>
      //             </Col>
      //          )}
      //          <Col md={6}>
      //             <FormGroup>
      //                <Label htmlFor="episode">Current Episode</Label>
      //                <Input
      //                   id="episode"
      //                   type="text"
      //                   value={episode}
      //                   onChange={handleEpisodeChange}
      //                />
      //             </FormGroup>
      //          </Col>
      //       </Row>

      //       <Button>Admit Patient</Button>
      //    </Form>
      // </>
      <Box as="form" onSubmit={handleSubmitForm}>
         <Flex direction="row" alignItems="center" mr={1}>
            <FormControl mr={4}>
               <FormLabel htmlFor="firstName">First Name</FormLabel>
               <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  width="full"
                  borderColor="grey"
                  borderWidth={"1px"}
                  rounded="md"
                  onChange={handleFirstNameChange}
               />
            </FormControl>
            <FormControl mr={4}>
               <FormLabel htmlFor="lastName">Last Name</FormLabel>
               <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  width="full"
                  borderColor="grey"
                  borderWidth={"1px"}
                  rounded="md"
                  onChange={handleLastNameChange}
               />
            </FormControl>
            <FormControl mr={4}>
               <FormLabel htmlFor="birthdate">Birthdate</FormLabel>
               <Input
                  id="birthdate"
                  type="date"
                  value={birthdate}
                  width="full"
                  borderColor="grey"
                  borderWidth={"1px"}
                  rounded="md"
                  onChange={handleBirthdateChange}
               />
            </FormControl>
            <FormControl>
               <FormLabel htmlFor="bed">Bed</FormLabel>
               <Input
                  id="bed"
                  type="number"
                  value={bed}
                  width="full"
                  borderColor="grey"
                  borderWidth={"1px"}
                  rounded="md"
                  onChange={handleBedChange}
               />
            </FormControl>
         </Flex>

         <FormControl mt={2} mr={1}>
            <FormLabel htmlFor="personalMedicalHistory">
               Medical History
            </FormLabel>
            <Textarea
               id="personalMedicalHistory"
               value={personalMedicalHistory}
               onChange={handlePersonalMedicalHistoryChange}
               width="full"
               borderColor="grey"
               borderWidth={"1px"}
               rounded="md"
            />
         </FormControl>
         <FormControl mr={1}>
            <FormLabel htmlFor="regularMedication">
               Regular Medication
            </FormLabel>
            <Textarea
               id="regularMedication"
               type="text"
               value={regularMedication}
               width="full"
               borderColor="grey"
               borderWidth={"1px"}
               rounded="md"
               onChange={handleRegularMedicationChange}
            />
         </FormControl>

         <Flex direction="row" alignItems="center" mt={4} mr={1}>
            <FormControl mr={4}>
               <Checkbox
                  id="alergies"
                  isChecked={alergies}
                  onChange={handleAlergiesChange}
                  width="full"
                  borderColor="grey"
                  borderWidth={"1px"}
                  rounded="md"
               >
                  Allergies
               </Checkbox>
            </FormControl>
            {alergies && (
               <FormControl>
                  <FormLabel htmlFor="alergiesSpecification">
                     Allergy Specification:
                  </FormLabel>
                  <Input
                     id="alergiesSpecification"
                     type="text"
                     value={alergiesSpecification}
                     width="full"
                     borderColor="grey"
                     borderWidth={"1px"}
                     rounded="md"
                     onChange={handleAlergiesSpecificationChange}
                  />
               </FormControl>
            )}
         </Flex>

         <FormControl mt={4} mr={1}>
            <FormLabel htmlFor="episode">Current Episode</FormLabel>
            <Textarea
               id="episode"
               type="text"
               value={episode}
               width="full"
               borderColor="grey"
               borderWidth={"1px"}
               rounded="md"
               onChange={handleEpisodeChange}
            />
         </FormControl>

         <Button type="submit" mt={4} mr={4}>
            Admit Patient
         </Button>
      </Box>
   );
}

export default AdmitPatient;
