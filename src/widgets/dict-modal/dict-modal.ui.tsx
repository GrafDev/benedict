import {
    Button, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import {FormDict} from "./form-dict.tsx";
import {useDict, useDictModal} from "../../shared/store/zustand";
import {getOneTranslateWord} from "../../features/toGame";
import {IDictionaryItem} from "../../shared/types.ts";

export const DictModal = ({isOpen, onClose}: { isOpen: boolean, onClose: () => void }) => {
    const editWord: IDictionaryItem = useDictModal((state) => state.editWord)
    const indexEditWord: number = useDictModal((state) => state.indexEditWord)
    const setWordToCurrentDict = useDict((state) => state.setWordToCurrentDict)
    const addWordToCurrentDict = useDict((state) => state.addWordToCurrentDict)

    const handler = (flag: boolean) => {
        if (flag) {
            if (indexEditWord >= 0) {
                setWordToCurrentDict(editWord, indexEditWord)
            } else {
                addWordToCurrentDict(editWord)
            }
        }

        onClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{editWord.word + " - " + getOneTranslateWord(editWord)}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <FormDict/>
                </ModalBody>

                <ModalFooter>
                    <Button variant='ghost' onClick={() => handler(true)}>
                        {indexEditWord >= 0 ? "Save" : "Add"}
                    </Button>
                    <Button colorScheme='blue' mr={3} onClick={() => handler(false)}>
                        Cancel
                    </Button>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )

}