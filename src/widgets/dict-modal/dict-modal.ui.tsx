import {
    Button, FormControl, Modal,
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
    const [word, setWord] = useState<IDictionaryItem>(editWord)
    const [isErrorWord, setIsErrorWord] = useState(false)
    const handleClose = () => {
        onClose()
    }
    useEffect(() => {
        setWord(editWord)
    }, [editWord]);

const handlerChange=(e:any)=>{
    setWord({...word, [e.target.name]: e.target.value})
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
                                            required={false}
                                            value={value}
                                            item={key}
                                            handleChangeWord={handlerChange}
                                        />
                                    )
                                } else return null
                            }
                        )}

                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost'
                                type={"submit"}
                                onClick={handlerSubmit}
                        >
                            {indexEditWord >= 0 ? "Save" : "Add"}
                        </Button>
                        <Button colorScheme='blue'
                                mr={3}
                                onClick={handleClose}>
                            Cancel
                        </Button>

                    </ModalFooter>
                </FormControl>

            </ModalContent>
        </Modal>
    )

}