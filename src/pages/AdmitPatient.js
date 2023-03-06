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
import { useNavigate, useParams } from "react-router-dom";
import { admitPatient } from "../api";

function AdmitPatient() {
   const { patientId } = useParams();
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
      alert(`Patient admited to bed number ${bed}`)
      navigate("/");
   }

   return (
      <Box as="form" onSubmit={handleSubmitForm}>
         <Flex direction="row" alignItems="center" m={1}>
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
                  placeholder={patientId}
                  width="full"
                  borderColor="grey"
                  borderWidth={"1px"}
                  rounded="md"
                  onChange={handleBedChange}
               />
            </FormControl>
         </Flex>

         <FormControl mt={2} m={1}>
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
         <FormControl m={1}>
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

         <Flex direction="row" alignItems="center" mt={4} m={1}>
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

         <FormControl mt={4} m={1}>
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

         <Button
            type="submit"
            colorScheme="blue"
            variant="ghost"
            rounded={"full"}
            bg="rgb(178,204,219)"
            color={"blue.800"}
            p={1}
            boxShadow={
               "1px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
               bg: "rgb(91,146,179)",
            }}
            _focus={{
               bg: "rgb(91,146,179)",
            }}
         >
            Admit Patient
         </Button>
      </Box>
   );
}

export default AdmitPatient;
