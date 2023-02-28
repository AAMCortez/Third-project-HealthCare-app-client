import {
   Button,
   Card,
   Popover,
   PopoverArrow,
   PopoverBody,
   PopoverContent,
   PopoverFooter,
   PopoverHeader,
   PopoverTrigger,
   Portal,
   SimpleGrid,
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

   const beds = [1, 2, 3, 4, 5, 6];

   return (
      <SimpleGrid
         spacing={4}
         templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
         {" "}
         <div>
            {beds.map((bedNumber) => {
               const patient = patients?.find((p) => p.bed === bedNumber); // find patient with matching bed number
               const imgSrc = patient
                  ? "../images/bedfull.png"
                  : "../images/bedempty.png"; // determine image source
               const patientName = patient ? patient.firstName : "Empty Bed";
               const patientLastName = patient ? patient.lastName : null;
               const patientAge = patient ? patient.age : null;
               const patientEpisode = patient ? patient.episode : null;

               return (
                  <Popover trigger="hover">
                     <PopoverTrigger>
                        <Button>
                           <Link key={bedNumber} to={`/patient/${bedNumber}`}>
                              <Card>
                                 <img
                                    style={{ width: "150px", height: "100px" }}
                                    src={imgSrc}
                                    alt={`bed${bedNumber}`}
                                 />
                              </Card>
                           </Link>
                        </Button>
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
                                    <div>
                                       Patient {patientName} {patientLastName}{" "}
                                       {patientAge} Years old
                                    </div>
                                    <div>Admited with {patientEpisode}</div>
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
         </div>
      </SimpleGrid>
   );
}

export default Home;
