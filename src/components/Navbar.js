import { NavLink } from "react-router-dom";
function Navbar() {
   return (
      <nav>
         <NavLink to="/">Home</NavLink>
         <NavLink to="/login">Login</NavLink>
         <NavLink to="/signup">Signup</NavLink>
         <NavLink to="/patient/admit">Admit Patient</NavLink>
      </nav>
   );
}

export default Navbar;
