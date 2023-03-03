import {
   Box,
   Button,
   FormControl,
   FormLabel,
   Input,
   Stack,
   Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
         <Box as="form" w="400px" onSubmit={handleSubmitForm}>
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
               Add Wound
            </Button>
         </Box>
      </>
   );
}

export default AddWound;
