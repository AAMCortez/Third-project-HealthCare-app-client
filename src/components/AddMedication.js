import {
   Box,
   Button,
   FormControl,
   FormLabel,
   Input,
   Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updatePatient } from "../api";

function AddMedication() {
   const [medication, setMedication] = useState("");
   const [searchQuery, setSearchQuery] = useState("");
   const [searchRoute, setSearchRoute] = useState("");
   const [results, setResults] = useState([]);
   const { patientId } = useParams();
   const navigate = useNavigate();
   useEffect(() => {
      const getDrugs = async () => {
         await axios
            .get("https://api.fda.gov/drug/label.json", {
               params: {
                  api_key: process.env.FDA_API_KEY,
                  search: `openfda.generic_name:"${searchQuery}" AND openfda.route:"${searchRoute}"`,
                  limit: 1,
               },
            })
            .then((response) => {
               console.log("response data here ", response.data.results);
               setResults(response.data.results);
            })
            .catch((error) => {
               console.error(error);
            });
      };

      getDrugs();
   }, [searchQuery, searchRoute]);
   function handleMedicationChange(event) {
      setMedication(event.target.value);
   }
   function handleSearchQueryChange(event) {
      setSearchQuery(event.target.value);
   }
   function handleSearchRouteChange(event) {
      setSearchRoute(event.target.value);
   }

   async function handleSubmitForm(event) {
      event.preventDefault();
      await updatePatient(patientId, { medication });
      navigate(`/patient/${patientId}`);
   }
   return (
      <>
         <Box as="form" onSubmit={handleSubmitForm} w="500px" h="91vh" margin="auto">
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
               padding="2px 3px 2px 3px"
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
               Update Medication
            </Button>

            <Box>
               {results.map((medication, index) => (
                  <li key={index}>{medication.openfda.generic_name}</li>
               ))}
            </Box>
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
            </Stack>
         </Box>
      </>
   );
}

export default AddMedication;
