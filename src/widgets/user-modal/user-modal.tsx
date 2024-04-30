import {
    Button,
    FormControl, HStack,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react";
import {TUserOptions} from "../../shared/types.ts";


export const UserModal = ({isOpen, onClose,userOptions}: { isOpen: boolean, onClose: () => void ,userOptions: TUserOptions}) => {


    // const handlerChange = (event: any) => {
    //     console.log("Handler change", event)
    // }
    // const handlerDelete = () => {
    //     console.log("Handler delete")
    //     onClose()
    // }
    const handleClose = () => {
        console.log("Handler close")
        onClose()
    }

    const handlerSubmit = () => {
        console.log("Handler submit")
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            // Вызов функции сохранения
            handlerSubmit();
        }
        if (event.key === 'Escape') {
            // Вызов функции закрытия
            handleClose();
        }
    });

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            onOverlayClick={handleClose}
            isCentered>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader justifyItems={"space-between"}
                             alignItems={"center"}
                             display={"flex"}
                             justifyContent={"space-between"}
                             ml={5}>
                    <Text>
                        <ModalCloseButton/>
                    </Text>
                </ModalHeader>

                <FormControl onSubmit={handlerSubmit}>
                    <ModalBody>


                    </ModalBody>

                    <ModalFooter as={HStack}
                                 justifyContent={"space-between"}>
                    <Button variant='outline'
                            size={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "lg", "2xl": "lg"}}
                            type={"submit"}
                            colorScheme={"blue"}
                            onClick={handlerSubmit}
                    >
                        {userOptions}
                    </Button>
                    <Button variant={"outline"}
                            size={{base: "sm", sm: "sm", md: "md", lg: "md", xl: "lg", "2xl": "lg"}}
                            onClick={handleClose}>
                        Cancel
                    </Button>

                </ModalFooter>
            </FormControl>

        </ModalContent>
</Modal>
)
}