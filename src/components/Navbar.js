import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
function Navbar() {
   return (
      <Nav vertical>
         <NavItem>
            <NavLink to="/">Home</NavLink>
         </NavItem>
         <NavItem>
            <NavLink to="/login">Login</NavLink>
         </NavItem>
         <NavItem>
            <NavLink to="/signup">Signup</NavLink>
         </NavItem>
      </Nav>
   );
}

export default Navbar;
