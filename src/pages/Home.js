import { Link } from "react-router-dom";
import { getAllPatients } from "../api";


// Later use popover reactstrap to show details of each bed


function Home() {
   getAllPatients();
   return (
      <div>
         <Link to={`/patient/1`}>
            <img
               style={{ width: "200px", height: "200px" }}
               src="../images/bed.jpg"
               alt="bed1"
            />
         </Link>
         <Link to={`/patient/2`}>
            <img
               style={{ width: "200px", height: "200px" }}
               src="../images/bed.jpg"
               alt="bed2"
            />
         </Link>
         <Link to={`/patient/3`}>
            <img
               style={{ width: "200px", height: "200px" }}
               src="../images/bed.jpg"
               alt="bed3"
            />
         </Link>
         <Link to={`/patient/4`}>
            <img
               style={{ width: "200px", height: "200px" }}
               src="../images/bed.jpg"
               alt="bed4"
            />
         </Link>
         <Link to={`/patient/5`}>
            <img
               style={{ width: "200px", height: "200px" }}
               src="../images/bed.jpg"
               alt="bed5"
            />
         </Link>
      </div>
   );
}

export default Home;
