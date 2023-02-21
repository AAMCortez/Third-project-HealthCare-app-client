import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import { UserContext } from "../context/user.context";
import { useContext } from "react";
function Navbar() {
   const { loggedUser, logout } = useContext(UserContext);
   return (
      <Nav vertical>
         <div>
            <NavItem>
               <NavLink to="/">Home</NavLink>
            </NavItem>
            {loggedUser ? (
               <div className="navbar">
                  <p>Welcome {loggedUser.fullName}</p>
                  <button onClick={logout}>Logout</button>
               </div>
            ) : (
               <div>
                  <NavItem>
                     <NavLink to="/login">Login</NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink to="/signup">Signup</NavLink>
                  </NavItem>
               </div>
            )}
         </div>
      </Nav>
   );
}

export default Navbar;
