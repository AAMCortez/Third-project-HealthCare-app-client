import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
         <Box as="form" onSubmit={handleSubmitForm} w="500px">
            <FormControl>
               <FormLabel htmlFor="medication">Medication</FormLabel>
               <Input
                  width="full"
                  borderColor="grey"
                  borderWidth={"1px"}
                  rounded="md"
                  id="medication"
                  type="textbox"
                  value={medication}
                  onChange={handleMedicationChange}
               />
            </FormControl>

            <Button
               w="fit-content"
               rounded={"md"}
               bg={"blue.400"}
               color={"white"}
               boxShadow={
                  "1px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
               }
               _hover={{
                  bg: "blue.500",
               }}
               _focus={{
                  bg: "blue.500",
               }}
            >
               Update Plan
            </Button>
         </Box>
      </>
   );
}

export default AddMedication;
