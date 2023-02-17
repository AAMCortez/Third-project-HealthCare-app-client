import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../api";

function Login() {
   const [fullName, setFullName] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();

   function handleFullNameChange(event) {
      setFullName(event.target.value);
   }

   function handlePasswordChange(event) {
      setPassword(event.target.value);
   }
   async function handleSubmitFrom(event) {
      event.preventDefault();
      try {
         const response = await login({ fullName, password });
         localStorage.setItem("authToken", response.data);
         //Setting the logged user in the context
         toast.success("User logged in");
         setFullName("");
         setPassword("");
         navigate("/");
      } catch (error) {
         toast.error("Invalid Login");
      }
   }

   return (
      <>
         <h2>Login</h2>
         <form onSubmit={handleSubmitFrom}>
            <label htmlFor="fullName">Full Name</label>
            <input
               id="fullName"
               type="text"
               value={fullName}
               onChange={handleFullNameChange}
            />
            <label htmlFor="password">Password</label>
            <input
               id="password"
               type="password"
               value={password}
               onChange={handlePasswordChange}
            />
            <button type="submit">Login</button>
         </form>
         <p>Don't have an account?</p>
         <Link to="/signup">Sign up</Link>
      </>
   );
}

export default Login;
