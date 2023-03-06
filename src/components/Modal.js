import {
   Button,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalOverlay,
   useDisclosure,
   Flex,
} from "@chakra-ui/react";
import AdmitPatient from "../pages/AdmitPatient";

function AdmitModal() {
   const { isOpen, onOpen, onClose } = useDisclosure();
   return (
      <>
         <Button
            onClick={onOpen}
            flex={2}
            fontSize={"sm"}
            size={"md"}
            height={"30px"}
            width={"100px"}
            rounded={"full"}
            bg="rgb(178,204,219)"
            color={"blue.800"}
            boxShadow={
               "1px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
               bg: "rgb(91,146,179)",
            }}
            _focus={{
               bg: "rgb(91,146,179)",
            }}
         >
            Admit Patient
         </Button>
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay
               bg="none"
               backdropFilter="auto"
               backdropInvert="30%"
               backdropBlur="2px"
            />
            <Flex alignItems="center" justifyContent="center">
               <ModalContent
                  className="ModalContent"
                  borderColor="grey"
                  borderWidth={"5px"}
                  borderRadius="md"
                  bg="rgb(200,225,232)"
                  boxShadow="md"
                  h="fit-content"
                  w="fit-content"
                  position="fixed"
                  left="25vw"
                  top="20vh"
               >
                  <ModalBody bgColor="white">
                     <AdmitPatient />
                  </ModalBody>
                  <ModalFooter
                     alignItems="center"
                     justifyContent="center"
                     h="fit-content"
                  >
                     <Button
                        colorScheme="blue"
                        variant="ghost"
                        rounded={"full"}
                        bg="rgb(178,204,219)"
                        color={"blue.800"}
                        p={2}
                        boxShadow={
                           "1px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                        }
                        _hover={{
                           bg: "rgb(91,146,179)",
                        }}
                        _focus={{
                           bg: "rgb(91,146,179)",
                        }}
                        onClick={onClose}
                     >
                        Close
                     </Button>
                     {/* <Button
                        variant="ghost"
                        rounded={"full"}
                        bg={"red.500"}
                        color={"white"}
                        p={3}
                        boxShadow={
                           "1px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                        }
                        _hover={{
                           bg: "blue.500",
                        }}
                        _focus={{
                           bg: "blue.500",
                        }}
                     >
                        Admit Patient
                     </Button> */}
                  </ModalFooter>
               </ModalContent>
            </Flex>
         </Modal>
      </>
   );
}
export default AdmitModal;
