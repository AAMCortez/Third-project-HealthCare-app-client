import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPatients } from "../api";


// Later use popover reactstrap to show details of each bed


function Home() {
   const [patients, setPatients] = useState(null);

   useEffect(() => {
      async function handlePatientDetails() {
         const response = await getAllPatients()
         setPatients(response.data);
      }
      handlePatientDetails();
   }, []);

   const beds = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      {beds.map((bedNumber) => {
        const patient = patients?.find((p) => p.bed === bedNumber); // find patient with matching bed number
        const imgSrc = patient ? "../images/bedfull.png" : "../images/bedempty.png"; // determine image source
        return (
          <Link key={bedNumber} to={`/patient/${bedNumber}`}>
            <img
              style={{ width: "250px", height: "200px" }}
              src={imgSrc}
              alt={`bed${bedNumber}`}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default Home;
