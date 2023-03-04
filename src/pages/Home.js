import {
   Card,
   Popover,
   PopoverArrow,
   PopoverBody,
   PopoverContent,
   PopoverFooter,
   PopoverHeader,
   PopoverTrigger,
   Portal,
   Stack,
   Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPatients } from "../api";


function Home() {
   const [patients, setPatients] = useState(null);

   useEffect(() => {
      async function handlePatientDetails() {
         const response = await getAllPatients();
         setPatients(response.data);
      }
      handlePatientDetails();
   }, []);

   const beds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

   return (
      <Stack
         spacing={20}
         display="flex"
         flexDirection="row"
         flexWrap="wrap"
         justifyContent="space-evenly"
         alignContent="center"
         alignItems="flex-end"
         gridTemplateRows="repeat(auto-fill, minmax(200px, 1fr))"
         bg="blue.200"
         h="91vh"
         
      >
         {beds.map((bedNumber) => {
            const patient = patients?.find((p) => p.bed === bedNumber); // find patient with matching bed number
            const imgSrc = patient
               ? "../images/bedblack.png"
               : "../images/bedwhite.png"; // determine image source
            const patientName = patient ? patient.firstName : "Empty Bed";
            const patientLastName = patient ? patient.lastName : null;
            const patientAge = patient ? patient.age : null;
            const patientEpisode = patient ? patient.episode : null;

            return (
               <Popover key={bedNumber} trigger="hover">
                  <PopoverTrigger>
                     <Card size="md">
                        <Link  to={`/patient/${bedNumber}`}>
                           <img
                              style={{ width: "300px" }}
                              src={imgSrc}
                              alt={`bed${bedNumber}`}
                           />
                        </Link>
                     </Card>
                  </PopoverTrigger>
                  <Portal>
                     <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader fontWeight="semibold">
                           Bed {bedNumber}
                        </PopoverHeader>
                        <PopoverBody>
                           {patient ? (
                              <>
                                 <Text>
                                    Patient {patientName} {patientLastName}{" "}
                                    {patientAge} Years old
                                 </Text>
                                 <Text>Admited with {patientEpisode}</Text>
                              </>
                           ) : (
                              patientName
                           )}
                        </PopoverBody>
                        <PopoverFooter></PopoverFooter>
                     </PopoverContent>
                  </Portal>
               </Popover>
            );
         })}
      </Stack>
   );
}

export default Home;
