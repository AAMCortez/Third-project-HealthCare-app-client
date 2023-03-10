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
         <form onSubmit={handleSubmitFrom}>
            <Flex
               minH={"90vh"}
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
                              width="full"
                              borderColor="grey"
                              borderWidth={"1px"}
                              rounded="md"
                           />
                        </FormControl>
                        <FormControl id="password">
                           <FormLabel>Password</FormLabel>
                           <Input
                              id="password"
                              type="password"
                              value={password}
                              onChange={handlePasswordChange}
                              width="full"
                              borderColor="grey"
                              borderWidth={"1px"}
                              rounded="md"
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
                              rounded="md"
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
