import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../api";
import { UserContext } from "../context/user.context";
import {
   Flex,
   Box,
   FormControl,
   FormLabel,
   Input,   
   Stack,
   Link,
   Button,
   Heading,
   Text,
   useColorModeValue,
} from "@chakra-ui/react";

function Login() {
   const [fullName, setFullName] = useState("");
   const [password, setPassword] = useState("");
   const { authenticateUser } = useContext(UserContext);
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
         authenticateUser({ fullName });
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
         {/* <h2>Login</h2>
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
         <Link to="/signup">Sign up</Link> */}

         <form onSubmit={handleSubmitFrom}>
            <Flex
               minH={"100vh"}
               align={"center"}
               justify={"center"}
               bg={useColorModeValue("gray.50", "gray.800")}
            >
               <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                  <Stack align={"center"}>
                     <Heading fontSize={"4xl"}>Login to your account</Heading>
                  </Stack>
                  <Box
                     rounded={"lg"}
                     bg={useColorModeValue("white", "gray.700")}
                     boxShadow={"lg"}
                     p={8}
                  >
                     <Stack spacing={4}>
                        <FormControl id="fullName">
                           <FormLabel>Full Name</FormLabel>
                           <Input
                              id="fullName"
                              type="text"
                              value={fullName}
                              onChange={handleFullNameChange}
                           />
                        </FormControl>
                        <FormControl id="password">
                           <FormLabel>Password</FormLabel>
                           <Input
                              id="password"
                              type="password"
                              value={password}
                              onChange={handlePasswordChange}
                           />
                        </FormControl>
                        <Stack spacing={10}>
                           <Button
                              type="submit"
                              bg={"blue.400"}
                              color={"white"}
                              _hover={{
                                 bg: "blue.500",
                              }}
                           >
                              Login
                           </Button>
                           <Text align={"center"}>
                              Already a user?
                              <Link
                                 as={ReachLink}
                                 to="/signup"
                                 color={"blue.400"}
                              >
                                 Signup
                              </Link>
                           </Text>
                        </Stack>
                     </Stack>
                  </Box>
               </Stack>
            </Flex>
         </form>
      </>
   );
}

export default Login;
