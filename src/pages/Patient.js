import {
   Button,
   Link,
   Box,
   Center,
   Heading,
   Text,
   Stack,
   useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { dischargePatient, getPatient } from "../api";
import { UserContext } from "../context/user.context";

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
         {/* <h3>
            Patient {patient.firstName} {patient.lastName}
         </h3>
         <p>{patient.age} years old</p>
         <p>Medical background of {patient.personalMedicalHistory}</p>
         <p>Regular medication {patient.regularMedication}</p>
         <p>Patient admited with {patient.episode}</p>
         {!patient.alergies ? (
            <p>Patient has allergies to: {patient.alergiesSpecification}</p>
         ) : (
            <p>No allergies known</p>
         )}
         {patient.imageUrl && (
            <img
               src={patient.imageUrl}
               width="300"
               height="300"
               alt="patient"
            />
         )}
         {patient && patient.healthcarePlan ? (
            <div>
               <h4>Patient Health Care Plan</h4>
               {patient.healthcarePlan.map((intervention) => {
                  return <p key={intervention}>{intervention}</p>;
               })}
            </div>
         ) : null}

         {patient && patient.medication ? (
            <div>
               <h4>Patient Medication</h4>
               {patient.medication.map((meds) => {
                  return <p key={meds}>{meds}</p>;
               })}
            </div>
         ) : null}

         {type.isNurse && (
            <Button onClick={() => navigate(`/interventions/${patientId}`)}>
               Add interventions to the Plan
            </Button>
         )}

         {type.isDr && (
            <Button onClick={() => navigate(`/meds/${patientId}`)}>
               Add medication
            </Button>
         )}

         <div>
            {patient.wound.length > 0 ? (
               <>
                  <h4>
                     {patient.firstName} {patient.lastName} Wounds:
                  </h4>
                  {patient.wound.map((wound) => {
                     return (
                        <div key={wound._id}>
                           {wound.pictureUrl && (
                              <img
                                 src={wound.pictureUrl}
                                 width="300"
                                 height="300"
                                 alt="wound"
                              />
                           )}
                           <p>{wound.description}</p>
                           <p>{wound.treatment}</p>
                        </div>
                     );
                  })}
               </>
            ) : (
               <p>Patient has skin integrity intact</p>
            )}
            {loggedUser ? (
               <Link as={ReachLink} to={`/wound/${patientId}`}>
                  <Button>Add a wound</Button>
               </Link>
            ) : null}
         </div>
         {loggedUser ? (
            <Button onClick={handleDischargePatient}>Discharge patient</Button>
         ) : null} */}
         <>
            <Center py={100}>
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
                     </Stack>
                     <Stack>
                        {patient && patient.healthcarePlan.length > 0 ? (
                           <Text color={"gray.700"}>
                              <Text fontWeight={600}>
                                 Patient Health Care Plan
                              </Text>
                              {patient.healthcarePlan.map((intervention) => {
                                 return (
                                    <Text key={intervention}>
                                       {intervention}
                                    </Text>
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
                              flex={2}
                              fontSize={"sm"}
                              rounded={"full"}
                              bg={"blue.400"}
                              color={"white"}
                              boxShadow={
                                 "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                              }
                              _hover={{
                                 bg: "blue.500",
                              }}
                              _focus={{
                                 bg: "blue.500",
                              }}
                           >
                              Add interventions to the Plan
                           </Button>
                        )}
                        {type.isDr && (
                           <Button
                              onClick={() => navigate(`/meds/${patientId}`)}
                              flex={2}
                              fontSize={"sm"}
                              size={"md"}
                              rounded={"full"}
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
                  </Stack>
                  <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
                     <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                        {!patient.alergies ? (
                           <>
                              <Text fontWeight={600}>
                                 Patient has allergies to:
                              </Text>{" "}
                              <Text>{patient.alergiesSpecification}</Text>
                           </>
                        ) : (
                           <Text>No allergies known</Text>
                        )}
                     </Stack>
                  </Stack>
               </Box>
            </Center>
         </>
      </>
   ) : (
      <Link as={ReachLink} to="../patient/admit">
         <Button>Admit Patient </Button>
      </Link>
   );
}

export default Patient;
