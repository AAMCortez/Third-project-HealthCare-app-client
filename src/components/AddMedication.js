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
   Select,
   Stack,
   Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteMedication, getPatient, updatePatient } from "../api";

function AddMedication() {
   const [medication, setMedication] = useState("");
   const [searchQuery, setSearchQuery] = useState("");
   const [searchRoute, setSearchRoute] = useState("");
   const [renderResults, setRenderResults] = useState(false);
   const [results, setResults] = useState([]);
   const [medicationList, setMedicationList] = useState([]);
   const { patientId } = useParams();
  

   useEffect(() => {
      async function handlePatientDetail() {
         const response = await getPatient(patientId);
         setMedication(response.data);
         setMedicationList(response.data.medication || []);
      }
      handlePatientDetail();
   }, [patientId]);

   async function handleSearchButtonClick(event) {
      event.preventDefault();
      setRenderResults(true);
      await axios
         .get("https://api.fda.gov/drug/label.json", {
            params: {
               api_key: process.env.FDA_API_KEY,
               search: `openfda.generic_name:"${searchQuery}" AND openfda.route:"${searchRoute}"`,
               limit: 5,
            },
         })
         .then((response) => {
            console.log("response data here ", response.data.results);
            setResults(response.data.results);
            setRenderResults(true);
         })
         .catch((error) => {
            console.error(error);
         });
   }

   function handleMedicationChange(event) {
      setMedication(event.target.value);
   }
   function handleSearchQueryChange(event) {
      setSearchQuery(event.target.value);
   }
   function handleSearchRouteChange(event) {
      setSearchRoute(event.target.value);
   }
   async function handleDeleteMedication(medication) {
      deleteMedication(patientId, { medication });
      setMedicationList(medicationList.filter((item) => item !== medication));
   }
   async function handleSubmitForm(event) {
      event.preventDefault();
      await updatePatient(patientId, { medication });
      setMedicationList([...medicationList, medication]);
      setMedication("");
   }
   return (
      <>
         <Box
            as="form"
            onSubmit={handleSubmitForm}
            w="500px"
            h="91vh"
            margin="auto"
         >
            <Stack>
               <FormControl mt={4}>
                  <FormLabel htmlFor="search">Name</FormLabel>
                  <Input
                     width="full"
                     borderColor="grey"
                     borderWidth={"1px"}
                     rounded="md"
                     id="search"
                     type="textbox"
                     value={searchQuery}
                     onChange={handleSearchQueryChange}
                  />
               </FormControl>
               <FormControl mt={4}>
                  <FormLabel htmlFor="search">Route</FormLabel>
                  <Input
                     width="full"
                     borderColor="grey"
                     borderWidth={"1px"}
                     rounded="md"
                     id="search"
                     type="textbox"
                     value={searchRoute}
                     onChange={handleSearchRouteChange}
                  />
               </FormControl>
               <Button
                  onClick={handleSearchButtonClick}
                  w="fit-content"
                  rounded={"md"}
                  bg="rgb(178,204,219)"
                  color={"blue.800"}
                  boxShadow={
                     "1px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  }
                  _hover={{
                     bg: "rgb(91,146,179)",
                  }}
                  _focus={{
                     bg: "rgb(91,146,179)",
                  }}
                  padding="2px 3px 2px 3px"
               >
                  Search Medication
               </Button>
            </Stack>
            {renderResults && results.length > 0 && (
               <Stack>
                  <FormControl mt={5} mb={2}>
                     <FormLabel htmlFor="medication">Medication</FormLabel>
                     <Select
                        width="full"
                        borderColor="grey"
                        borderWidth={"1px"}
                        rounded="md"
                        id="medication"
                        icon="none"
                        placeholder="Select a Medication"
                        value={medication}
                        onChange={handleMedicationChange}
                     >
                        {results.map((medication) => (
                           <option key={medication.id}>
                              {medication.openfda.generic_name[0]
                                 .charAt(0)
                                 .toUpperCase() +
                                 medication.openfda.generic_name[0]
                                    .slice(1)
                                    .toLowerCase()}
                           </option>
                        ))}
                     </Select>
                  </FormControl>
                  <Button
                     w="fit-content"
                     rounded={"md"}
                     bg="rgb(178,204,219)"
                     color={"blue.800"}
                     boxShadow={
                        "1px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                     }
                     _hover={{
                        bg: "rgb(91,146,179)",
                     }}
                     _focus={{
                        bg: "rgb(91,146,179)",
                     }}
                     padding="2px 3px 2px 3px"
                     type="submit"
                  >
                     Update Medication
                  </Button>
               </Stack>
            )}
            {results.length === 0 && <p>there is no medication to present</p>}
         {medicationList.length > 0 && (
            <Box mt="4">
               <Text fontWeight="bold">Medication</Text>
               <List mt={2} spacing={2}>
                  {medicationList.map((medication, index) => (
                     <ListItem key={index}>
                        {medication}{" "}
                        <IconButton
                           onClick={() => handleDeleteMedication(medication)}
                           icon={<DeleteIcon color="red" mb={1} />}
                        />
                     </ListItem>
                  ))}
               </List>
            </Box>
         )}</Box>
         
      </>
   );
}

export default AddMedication;
