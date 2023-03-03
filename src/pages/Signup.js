import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api";
import { Link as ReachLink } from "react-router-dom";
import {
   Flex,
   Box,
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   HStack,
   InputRightElement,
   Stack,
   Button,
   Heading,
   Text,
   useColorModeValue,
   Link,
   Select,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";

function Signup() {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [fullName, setFullName] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
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
         await signup({ firstName, lastName, fullName, password });
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
         <form onSubmit={handleSubmitFrom}>
            <Flex
               minH={"90vh"}
               align={"center"}
               justify={"center"}
               bg={useColorModeValue("gray.50", "gray.800")}
            >
               <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                  <Stack align={"center"}>
                     <Heading fontSize={"4xl"} textAlign={"center"}>
                        Sign up
                     </Heading>
                  </Stack>
                  <Box
                     rounded={"lg"}
                     bg={useColorModeValue("white", "gray.700")}
                     boxShadow={"lg"}
                     p={8}
                  >
                     <Stack spacing={4}>
                        <HStack>
                           <Box>
                              <FormControl id="firstName">
                                 <FormLabel>First Name</FormLabel>
                                 <Input
                                    id="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                    width="full"
                                    borderColor="grey"
                                    borderWidth={"1px"}
                                    rounded="md"
                                 />
                              </FormControl>
                           </Box>
                           <Box>
                              <FormControl id="lastName">
                                 <FormLabel>Last Name</FormLabel>
                                 <Input
                                    id="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                    width="full"
                                    borderColor="grey"
                                    borderWidth={"1px"}
                                    rounded="md"
                                 />
                              </FormControl>
                           </Box>
                        </HStack>
                        <HStack>
                           <FormControl id="fullName">
                              <FormLabel>
                                 Are you a nurse or a doctor?
                              </FormLabel>
                              <Select
                                 name="fullName"
                                 id="fullName"
                                 value={fullName}
                                 onChange={handleFullNameChange}
                                 placeholder="Select an option"
                                 width="full"
                                 borderColor="grey"
                                 borderWidth={"1px"}
                                 rounded="md"
                                 icon="none"
                              >
                                 <option value="Nurse">Nurse</option>
                                 <option value="Dr">Doctor</option>
                              </Select>
                           </FormControl>
                        </HStack>
                        <FormControl id="password" isRequired>
                           <FormLabel>Password</FormLabel>
                           <InputGroup>
                              <Input
                                 type={showPassword ? "text" : "password"}
                                 id="password"
                                 value={password}
                                 onChange={handlePasswordChange}
                                 width="full"
                                 borderColor="grey"
                                 borderWidth={"1px"}
                                 rounded="md"
                              />
                              <InputRightElement h={"full"}>
                                 <Button
                                    variant={"ghost"}
                                    onClick={() =>
                                       setShowPassword(
                                          (showPassword) => !showPassword
                                       )
                                    }
                                 >
                                    {showPassword ? (
                                       <ViewIcon />
                                    ) : (
                                       <ViewOffIcon />
                                    )}
                                 </Button>
                              </InputRightElement>
                           </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                           <Button
                              loadingText="Submitting"
                              size="md"
                              bg={"blue.400"}
                              color={"white"}
                              _hover={{
                                 bg: "blue.500",
                              }}
                              type="submit"
                              rounded="md"
                           >
                              Sign up
                           </Button>
                        </Stack>
                        <Stack pt={6}>
                           <Text align={"center"}>
                              Already a user?
                              <Link
                                 as={ReachLink}
                                 to="/login"
                                 color={"blue.400"}
                              >
                                 Login
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

export default Signup;
