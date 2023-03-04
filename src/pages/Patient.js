import {
   Button,
   Link,
   Box,
   Center,
   Heading,
   Text,
   Stack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { dischargePatient, getPatient } from "../api";
import { UserContext } from "../context/user.context";
import AdmitModal from "../components/Modal";

function Patient() {
   const [patient, setPatient] = useState(null);
   const { patientId } = useParams();
   const navigate = useNavigate();
   const { loggedUser, getUserType } = useContext(UserContext);

   useEffect(() => {
      async function handlePatientDetail() {
         const response = await getPatient(patientId);
         setPatient(response.data);
      }
      handlePatientDetail();
   }, [patientId]);

   async function handleDischargePatient() {
      await dischargePatient(patientId);

      navigate("/");
   }
   const type = getUserType(loggedUser); // PROTECT OTHER ROUTES

   return patient ? (
      <>
         <Center>
            <Box
               maxW={"1000px"}
               w={"full"}
               boxShadow={"2xl"}
               rounded={"md"}
               p={6}
               overflow={"hidden"}
            >
               <Text
                  color={"red.500"}
                  textTransform={"uppercase"}
                  fontWeight={800}
                  fontSize={"md"}
                  letterSpacing={1.1}
               >
                  Bed {patient.bed}
               </Text>
               <Heading fontSize={"3xl"} fontFamily={"header"}>
                  {patient.firstName} {patient.lastName}
               </Heading>
               <Text fontWeight={600}>{patient.age} years old</Text>
               <Stack direction={["column", "row"]} spacing="24px">
                  <Stack>
                     <Text as="cite">
                        <Text fontSize={"xl"} fontFamily={"body"}>
                           Admited with{" "}
                        </Text>
                        {patient.episode}
                     </Text>

                     <Text color={"gray.700"}>
                        <Text fontWeight={600}>Medical background of</Text>{" "}
                        {patient.personalMedicalHistory}
                     </Text>
                     <Text color={"gray.700"}>
                        <Text fontWeight={600}>Regular medication</Text>{" "}
                        {patient.regularMedication}
                     </Text>
                     <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                        {patient.alergiesSpecification ? (
                           <>
                              <Text fontWeight={600}>
                                 Patient has allergies to:
                              </Text>
                              <Text>{patient.alergiesSpecification}</Text>
                           </>
                        ) : (
                           <Text>No allergies known</Text>
                        )}
                     </Stack>
                  </Stack>
                  <Stack>
                     {patient && patient.healthcarePlan.length > 0 ? (
                        <Text color={"gray.700"}>
                           <Text fontWeight={600}>
                              Patient Health Care Plan
                           </Text>
                           {patient.healthcarePlan.map((intervention) => {
                              return (
                                 <Text key={intervention}>{intervention}</Text>
                              );
                           })}
                        </Text>
                     ) : null}

                     {patient && patient.medication.length > 0 ? (
                        <Text color={"gray.700"}>
                           <Text fontWeight={600}>Patient Medication</Text>
                           {patient.medication.map((meds) => {
                              return <Text key={meds}>{meds}</Text>;
                           })}
                        </Text>
                     ) : null}
                     {type.isNurse && (
                        <Button
                           onClick={() =>
                              navigate(`/interventions/${patientId}`)
                           }
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
                           padding="4px 6px 4px 6px"

                        >
                           Add interventions to the Plan
                        </Button>
                     )}
                     {type.isDr && (
                        <Button
                           onClick={() => navigate(`/meds/${patientId}`)}
                           padding="4px 6px 4px 6px"
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
                           Add medication
                        </Button>
                     )}
                  </Stack>
                  <Stack mt={4} direction={"row"} spacing={3} align={"center"}>
                     <>
                        {patient.wound.length > 0 ? (
                           <Box>
                              <Text>
                                 {patient.firstName} {patient.lastName} Wounds:
                              </Text>
                              {patient.wound.map((wound) => {
                                 return (
                                    <Box key={wound._id}>
                                       {wound.pictureUrl && (
                                          <img
                                             src={wound.pictureUrl}
                                             width="100"
                                             alt="wound"
                                          />
                                       )}

                                       <Text color={"gray.700"}>
                                          <Text fontWeight={600}>
                                             Description
                                          </Text>
                                          {wound.description}
                                       </Text>
                                       <Text color={"gray.700"}>
                                          <Text fontWeight={600}>
                                             Treatment applied in
                                          </Text>
                                          {new Date(
                                             wound.createdAt
                                          ).toLocaleDateString()}
                                       </Text>
                                       {loggedUser ? (
                                          <Link
                                             as={ReachLink}
                                             to={`/wound/${patientId}`}
                                             
                                          >
                                             <Button
                                                flex={1}
                                                fontSize={"sm"}
                                                size={"md"}
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
                                                Add a wound
                                             </Button>
                                          </Link>
                                       ) : null}
                                    </Box>
                                 );
                              })}
                           </Box>
                        ) : (
                           <>
                              <Text>Patient has skin integrity intact</Text>
                              <Link as={ReachLink} to={`/wound/${patientId}`}>
                                 <Button
                                    flex={1}
                                    fontSize={"sm"}
                                    size={"md"}
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
                                    Add a wound
                                 </Button>
                              </Link>
                           </>
                        )}
                     </>
                  </Stack>
               </Stack>

               {loggedUser ? (
                  <Button
                     onClick={handleDischargePatient}
                     flex={2}
                     fontSize={"sm"}
                     size={"md"}
                     rounded={"md"}
                     bg={"red.500"}
                     w="fit-content"
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
                     Discharge patient
                  </Button>
               ) : null}
            </Box>
         </Center>
      </>
   ) : (
      <Stack
         height={"500px"}
         display={"flex"}
         justifyContent={"center"}
         alignItems={"center"}
      >
         {loggedUser ? (
            <Box width={"180px"}>
               <AdmitModal />
            </Box>
         ) : (
            <Button onClick={() => navigate("../login")}>
               Login to Admit a patient
            </Button>
         )}
      </Stack>
   );
}

export default Patient;
