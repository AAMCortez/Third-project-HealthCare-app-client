import { DeleteIcon } from "@chakra-ui/icons";
import {
   Box,
   Button,
   FormControl,
   FormLabel,
   IconButton,
   Input,
   List,
   ListItem,
   Text,
   VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteIntervention, getPatient, updatePatient } from "../api";

function AddIntervention() {
   const [patientPlan, setPatientPlan] = useState(null);
   const [healthcarePlan, setHealthcarePlan] = useState("");
   const [healthcarePlanList, setHealthcarePlanList] = useState([]);
   const { patientId } = useParams();

   useEffect(() => {
      async function handlePatientDetail() {
         const response = await getPatient(patientId);
         setPatientPlan(response.data);
         setHealthcarePlanList(response.data.healthcarePlan || []);
      }
      handlePatientDetail();
   }, [patientId]);

   function handleHealthcarePlanChange(event) {
      setHealthcarePlan(event.target.value);
   }

   async function handleSubmitForm(event) {
      event.preventDefault();
      await updatePatient(patientId, { healthcarePlan });
      setHealthcarePlanList([...healthcarePlanList, healthcarePlan]);
      setHealthcarePlan("");
   }
   async function handleDeleteIntervention(healthcarePlan) {
      deleteIntervention(patientId, { healthcarePlan });
      setHealthcarePlanList(healthcarePlanList.filter(item => item !== healthcarePlan))
   }
   return (
      <VStack w="500px">
         <Box as="form" onSubmit={handleSubmitForm} w="full">
            <FormControl>
               <FormLabel htmlFor="healthcarePlan">Interventions</FormLabel>
               <Input
                  width="full"
                  borderColor="grey"
                  borderWidth={"1px"}
                  rounded="md"
                  id="healthcarePlan"
                  type="textbox"
                  value={healthcarePlan}
                  onChange={handleHealthcarePlanChange}
                  onKeyDown={(event) => {
                     if (event.key === "Enter") {
                        handleSubmitForm(event);
                     }
                  }}
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
               type="submit"
            >
               Update Plan
            </Button>
            {healthcarePlanList.length > 0 && (
               <Box mt="4">
                  <Text fontWeight="bold">Healthcare Plan:</Text>
                  <List mt={2} spacing={2}>
                     {healthcarePlanList.map((plan, index) => (
                        <ListItem key={index}>
                           {plan} {" "}
                           <IconButton onClick={() => handleDeleteIntervention(plan)} icon={<DeleteIcon color="red" mb={1}/>}/>
                        </ListItem>
                     ))}
                  </List>
               </Box>
            )}
         </Box>
      </VStack>
   );
}

export default AddIntervention;
