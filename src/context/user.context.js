import { createContext, useEffect, useState } from "react";
import { verify } from "../api";

const UserContext = createContext();

function UserProviderWrapper({ children }) {
   const [loggedUser, setLoggedUser] = useState(null);

   async function authenticateUser() {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
         try {
            const response = await verify(storedToken);
            setLoggedUser(response.data);
         } catch (error) {
            setLoggedUser(null);
         }
      } else {
         setLoggedUser(null);
      }
   }

   function logout() {
      localStorage.removeItem("authToken");
      authenticateUser();
   }

   useEffect(() => {
      authenticateUser();
   }, []);

   function getUserType(loggedUser) {
      const fullName = loggedUser && loggedUser.fullName;
      let dr = false;
      let nurse = false;
       if (fullName && fullName.startsWith("Dr")) {
         dr = true;
      } else if (fullName && fullName.startsWith("Nurse")) {
         nurse = true;
      }
      return  { isDr: dr, isNurse: nurse };
   }

   return (
      <UserContext.Provider
         value={{
            loggedUser,
            setLoggedUser,
            authenticateUser,
            logout,
            getUserType,
         }}
      >
         {children}
      </UserContext.Provider>
   );
}

export { UserProviderWrapper, UserContext };
