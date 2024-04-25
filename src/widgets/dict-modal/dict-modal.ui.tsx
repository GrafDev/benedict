import {
    Button, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";

export const DictModal = ({isOpen,onClose}:{isOpen:boolean,onClose:()=>void}) => {

const handler = () => {
}
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </ModalBody>

                <ModalFooter>
                    <Button variant='ghost'>Secondary Action</Button>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Cancel
                    </Button>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )

}