import {
    Button, FormControl, HStack, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import {useDict, useDictModal} from "../../shared/store/zustand";
import {IDictionaryItem} from "../../shared/types.ts";
import {Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {InputDictaItem} from "../../shared/hooks";


export const DictModal = ({isOpen, onClose}: { isOpen: boolean, onClose: () => void }) => {
    const editWord: IDictionaryItem = useDictModal((state) => state.editWord)
    const indexEditWord: number = useDictModal((state) => state.indexEditWord)
    const setWordToCurrentDict = useDict((state) => state.setWordToCurrentDict)
    const addWordToCurrentDict = useDict((state) => state.addWordToCurrentDict)
    const deleteWordFromCurrentDict = useDict((state) => state.deleteWordFromCurrentDict)
    const [word, setWord] = useState<IDictionaryItem>(editWord)
    const [isErrorWord, setIsErrorWord] = useState(false)

    useEffect(() => {
        setWord(editWord)
    }, [editWord]);

    const handlerChange = (e: any) => {
        setWord({...word, [e.target.name]: e.target.value})
    }
    const handlerDelete = () => {
        deleteWordFromCurrentDict(indexEditWord)
        onClose()
    }
    const handleClose = () => {
        onClose()
    }

    const handlerSubmit = () => {
        if (indexEditWord >= 0 && !isErrorWord) {
            setWordToCurrentDict(word, indexEditWord)
        } else {
            addWordToCurrentDict(word)
        }
        !isErrorWord && onClose()
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

    useEffect(() => {
        word.word === "" ? setIsErrorWord(true) : setIsErrorWord(false)
    }, [word])
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
                        <Text fontWeight={"thin"} as={"span"}>
                            {indexEditWord >= 0 ? "Edit " : "Add "}
                        </Text>
                        {word.word}
                    </Text>

                    <Text>
                        <ModalCloseButton/>
                    </Text>
                </ModalHeader>

                <FormControl onSubmit={handlerSubmit}>
                    <ModalBody>
                        {Object.entries(editWord).map(([key, value]: [string, any]) => {
                                if (
                                    key !== "id" &&
                                    key !== "popular" &&
                                    key !== "learning"
                                ) {
                                    return (
                                        <InputDictaItem
                                            key={key}
                                            type={"text"}
                                            required={false}
                                            value={value}
                                            item={key}
                                            name={key}
                                            handleChangeWord={handlerChange}
                                        />
                                    )
                                } else return null
                            }
                        )}

                    </ModalBody>

                    <ModalFooter as={HStack}
                                 justifyContent={"space-between"}>
                        {indexEditWord >= 0 && <Button variant='outline'
                                                       colorScheme={"red"}
                                                       size={{
                                                           base: "sm",
                                                           sm: "sm",
                                                           md: "md",
                                                           lg: "md",
                                                           xl: "lg",
                                                           "2xl": "lg"
                                                       }}
                                                       onClick={handlerDelete}>
                            Delete
                        </Button>}
                        <Button variant='outline'
                                size={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "lg", "2xl": "lg"}}
                                type={"submit"}
                                colorScheme={"blue"}
                                onClick={handlerSubmit}
                        >
                            {indexEditWord >= 0 ? "Save" : "Add"}
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