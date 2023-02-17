import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api";
import { toast } from "react-toastify";

function Signup() {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [fullName, setFullName] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();

   function handleFirstNameChange(event) {
      setFirstName(event.target.value);
   }
   function handleLastNameChange(event) {
      setLastName(event.target.value);
   }
   function handleFullNameChange(event) {
      setFullName(event.target.value);
   }
   function handlePasswordChange(event) {
      setPassword(event.target.value);
   }
   async function handleSubmitFrom(event) {
      event.preventDefault();
      try {
         await signup({ firstName, lastName,fullName, password });
         toast.success("User created");
         setFirstName("");
         setLastName("");
         setPassword("");
         navigate("/");
      } catch (error) {
         toast.info(`Error`, error);
      }
   }

   return (
      <>
         <h2>Signup</h2>
         <form onSubmit={handleSubmitFrom}>
            <label htmlFor="firstName">First Name</label>
            <input
               id="firstName"
               type="text"
               value={firstName}
               onChange={handleFirstNameChange}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
               id="lastName"
               type="text"
               value={lastName}
               onChange={handleLastNameChange}
            />
            <label htmlFor="fullName">Are you a nurse or a doctor?</label>
            <select
               name="fullName"
               id="fullName"
               value={fullName}
               onChange={handleFullNameChange}
            >
               <option value="Nurse">Nurse</option>
               <option value="Dr">Doctor</option>
            </select>
            <label htmlFor="password">Password</label>
            <input
               id="password"
               type="password"
               value={password}
               onChange={handlePasswordChange}
            />
            <button type="submit">Sign up</button>
         </form>
         <p>Already have an account?</p>
         <Link to="/login">Login</Link>
      </>
   );
}

export default Signup;
