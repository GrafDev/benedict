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
import {IDictionaryItem} from "../../shared/types.ts";
import {useForm} from "react-hook-form";
import {Text} from "@chakra-ui/react";

export const DictModal = ({isOpen, onClose}: { isOpen: boolean, onClose: () => void }) => {
    const editWord: IDictionaryItem = useDictModal((state) => state.editWord)
    const indexEditWord: number = useDictModal((state) => state.indexEditWord)
    const setWordToCurrentDict = useDict((state) => state.setWordToCurrentDict)
    const addWordToCurrentDict = useDict((state) => state.addWordToCurrentDict)
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IDictionaryItem>()

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

                <ModalHeader justifyItems={"space-between"}
                             alignItems={"center"}
                             display={"flex"}
                             justifyContent={"space-between"}
                             pl={5}>
                    <Text as={"span"}
                          fontSize={{base: "sx", sm: "sx", md: "md", lg: "md", xl: "large", "2xl": "x-large"}}
                          fontWeight={"thin"}>
                        {indexEditWord < 0
                            ? "Add"
                            : "Edit"}
                    </Text>
                    <Text>
                        {editWord.word}
                    </Text>
                    <Text>
                        <ModalCloseButton/>

                    </Text>
                </ModalHeader>

                <form>


                    <ModalBody>
                        <FormDict/>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' onClick={() => handler(true)}>
                            {indexEditWord >= 0 ? "Save" : "Add"}
                        </Button>
                        <Button colorScheme='blue'
                                mr={3}
                                onClick={() => handler(false)}
                                type={"submit"}>
                            Cancel
                        </Button>

                    </ModalFooter>
                </form>

            </ModalContent>
        </Modal>
    )

}