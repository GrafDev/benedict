import {
    Button, FormControl, FormErrorMessage, Input, InputGroup, InputLeftAddon, Modal,
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

    const handleChangeWord = (e: any) => setWord({...word, word: e.target.value})


    const handleSubmit = () => {
        if (indexEditWord >= 0 && !isErrorWord) {
            setWordToCurrentDict(word, indexEditWord)
        } else {
            addWordToCurrentDict(word)
        }
        !isErrorWord && onClose()
    }

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

                <FormControl onSubmit={handleSubmit} >
                    <ModalBody>
                        <InputGroup
                            size={{
                                base: "sm",
                                sm: "sm",
                                md: "md",
                                lg: "md",
                                xl: "lg",
                                "2xl": "lg",
                            }}
                        >
                            <InputLeftAddon roundedLeft={5}>word</InputLeftAddon>
                            <Input roundedRight={5}
                                   required={true}
                                   value={word.word}
                                   onChange={handleChangeWord}
                            />
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                        </InputGroup>
                        {/*<FormDict register={register}/>*/}

                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost'
                                type={"submit"}
                                onClick={handleSubmit}
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