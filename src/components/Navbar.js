import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import { UserContext } from "../context/user.context";
import { useContext } from "react";
function Navbar() {
   const { loggedUser, logout } = useContext(UserContext);
   return (
      <Nav className="navbar">
         <div>
            <NavItem>
               <NavLink className="navbar-button" to="/">Home</NavLink>
            </NavItem>
            {loggedUser ? (
               <div className="navbar-logged-user">
                  <p>Welcome {loggedUser.fullName}</p>
                  <button onClick={logout}>Logout</button>
               </div>
            ) : (
               <div>
                  <NavItem>
                     <NavLink className="navbar-button" to="/login">Login</NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink className="navbar-button" to="/signup">Signup</NavLink>
                  </NavItem>
               </div>
            )}
         </div>
      </Nav>
   );
}

export default Navbar;
