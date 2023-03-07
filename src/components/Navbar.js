import { UserContext } from "../context/user.context";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
   Box,
   Flex,
   Avatar,
   HStack,
   IconButton,
   Button,
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   MenuDivider,
   useDisclosure,
   Stack,
   Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
const Links = ["Home"];

export default function Navbar() {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const { loggedUser, logout, getUserType } = useContext(UserContext);
   const type = getUserType(loggedUser);
   const navigate = useNavigate();

   function handleGoBack() {
     navigate(-1);
   }
   let imgSrc = "";

   function srcImgLogo() {
      if (type.isDr) {
         return (imgSrc = "../images/doctor-icon.jpg");
      } else if (type.isNurse) {
         return (imgSrc = "../images/nurse-icon.png");
      } else {
         return (imgSrc = "../images/user-icon.png");
      }
   }
   srcImgLogo();

   return (
      <>
         <Box bg={`rgb(175, 204, 218)`} px={4}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
               <IconButton
                  size={"md"}
                  icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                  aria-label={"Open Menu"}
                  display={{ md: "none" }}
                  onClick={isOpen ? onClose : onOpen}
               />
               <HStack spacing={8} alignItems={"center"}>
                  <Box fontSize="xl">
                     {loggedUser ? (
                        <Text>Welcome {loggedUser.fullName}</Text>
                     ) : (
                        <Text>Please Login</Text>
                     )}
                  </Box>
                  <HStack
                     as={"nav"}
                     spacing={4}
                     display={{ base: "none", md: "flex" }}
                     fontSize="xl"
                  >
                     <NavLink to="/">Home</NavLink>
                     <button onClick={handleGoBack}><img src="../images/undoIcon.png" alt="Go back" width="30px"/></button>
                  </HStack>
               </HStack>
               <Flex alignItems={"center"}>
                  <Menu>
                     <MenuButton
                        as={Button}
                        rounded={"full"}
                        variant={"link"}
                        cursor={"pointer"}
                        minW={0}
                     >
                        <Avatar width="50px" src={imgSrc} />
                     </MenuButton>

                     <MenuList>
                        {loggedUser ? (
                           <MenuItem onClick={logout}>Logout</MenuItem>
                        ) : (
                           <>
                              <MenuItem>
                                 <NavLink to="/login">Login</NavLink>
                              </MenuItem>
                              <MenuItem>
                                 <NavLink to="/signup">Signup</NavLink>
                              </MenuItem>
                              <MenuDivider />
                           </>
                        )}
                     </MenuList>
                  </Menu>
               </Flex>
            </Flex>

            {isOpen ? (
               <Box pb={4} display={{ md: "none" }}>
                  <Stack as={"nav"} spacing={4}>
                     {Links.map((link) => (
                        <NavLink key={link}>{link}</NavLink>
                     ))}
                  </Stack>
               </Box>
            ) : null}
         </Box>
      </>
   );
}
