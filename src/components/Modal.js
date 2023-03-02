import {
   Button,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalOverlay,
   useDisclosure,
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
            rounded={"full"}
            bg={"blue.400"}
            color={"white"}
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
            Admit Patient{" "}
         </Button>

         <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent
               width="500px"
               height="500px"
               borderColor="black"
               borderWidth={"1px"}
               borderRadius="md"
               bg="red.100"
               boxShadow="md"
            >
               
               <ModalBody bgColor="white">
                  <AdmitPatient />
               </ModalBody>
               <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                     Close
                  </Button>
                  <Button variant="ghost" flex={2}
                        fontSize={"sm"}
                        mr={5}
                        width={10}
                        rounded={"full"}
                        bg={"red.500"}
                        color={"white"}
                        boxShadow={
                           "1px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                        }
                        _hover={{
                           bg: "blue.500",
                        }}
                        _focus={{
                           bg: "blue.500",
                        }}>Admit Patient</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
}
export default AdmitModal;
