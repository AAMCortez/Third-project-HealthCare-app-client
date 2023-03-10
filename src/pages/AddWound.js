import {
   Box,
   Button,
   FormControl,
   FormLabel,
   HStack,
   Input,
   Stack,
   Text,
   Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addWound, getPatient, uploadImage } from "../api";

function AddWound() {
   const [pictureUrl, setPictureUrl] = useState("");
   const [description, setDescription] = useState("");
   const [treatment, setTreatment] = useState("");
   const { patientId } = useParams();
   const [patient, setPatient] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      async function handlePatientDetail() {
         const response = await getPatient(patientId);
         setPatient(response.data);
      }
      handlePatientDetail();
   }, [patientId]);

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
     
      navigate(`/patient/${patientId}`);
   }
   return (
      <Box h="91vh" background-image={`url("../../images/background.png")`}>
         <Box as="form" w="400px" margin="auto" onSubmit={handleSubmitForm}>
            <Stack>
               <Box md={3}>
                  <FormControl>
                     <FormLabel htmlFor="image">Upload Wound Image</FormLabel>
                     <Input
                        id="image"
                        type="file"
                        onChange={handleImageSelect}
                     />
                  </FormControl>
               </Box>
               <Box md={3}>
                  <FormControl>
                     <FormLabel htmlFor="description">Description</FormLabel>
                     <Textarea
                        resize="none"
                        width="full"
                        borderColor="grey"
                        borderWidth={"1px"}
                        rounded="md"
                        id="description"
                        type="textbox"
                        value={description}
                        onChange={handleDescriptionChange}
                     />
                  </FormControl>
               </Box>
               <Box md={2}>
                  <FormControl>
                     <FormLabel htmlFor="treatment">Treatment</FormLabel>
                     <Textarea
                        resize="none"
                        width="full"
                        borderColor="grey"
                        borderWidth={"1px"}
                        rounded="md"
                        id="treatment"
                        type="textbox"
                        value={treatment}
                        onChange={handleTreatment}
                     />
                  </FormControl>
               </Box>
            </Stack>

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
               Add Wound
            </Button>
         </Box>
         <Box display="flex" alignContent="flex-start" m="1">
            {patient && patient.wound.length > 0 ? (
               <Box>
                  <Text>
                     {patient.firstName} {patient.lastName} Wounds:
                  </Text>
                  <HStack
                     spacing="50px"
                     display="flex"
                     alignItems="flex-start"
                     maxWidth="200px"
                     maxH="200px"
                  >
                     {patient.wound.map((wound) => {
                        return (
                           <HStack
                              rounded="md"
                              bgColor={`rgb(175, 204, 218)`}
                              border="1px"
                              boxShadow="lg"
                              p="2px"
                              key={wound._id}
                              display="flex"
                              align-items="flex-start"
                           >
                              <Box w="200px">
                                 {wound.pictureUrl && (
                                    <img src={wound.pictureUrl} alt="wound" />
                                 )}
                              </Box>
                              <Box>
                                 <Text color={"gray.700"}>
                                    <Text w="100px" fontWeight={600}>
                                       Description
                                    </Text>
                                    {wound.description}
                                 </Text>
                                 <Text color={"gray.700"}>
                                    <Text fontWeight={600}>Treatment</Text>
                                    {wound.treatment}
                                 </Text>
                                 <Stack
                                    mt="10px"
                                    direction={"column"}
                                    spacing={0}
                                    fontSize={"smaller"}
                                 >
                                    <Text fontWeight={600}>
                                       Treatment applied in
                                    </Text>
                                    <Text color={"gray.600"}>
                                       {new Date(
                                          wound.createdAt
                                       ).toLocaleDateString()}
                                    </Text>
                                 </Stack>
                              </Box>
                           </HStack>
                        );
                     })}
                  </HStack>
               </Box>
            ) : (
               <Text>No wounds to present</Text>
            )}
         </Box>
      </Box>
   );
}

export default AddWound;
