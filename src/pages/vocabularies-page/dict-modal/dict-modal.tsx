import {
    Button, FormControl, HStack, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import {useUser, useDictModal} from "../../../shared/store/zustand";
import {IDictionaryItem} from "../../../shared/types.ts";
import {Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {InputDictItem} from "../../../shared/hooks";
import {emptyWord} from "../../../shared/store/constants-store";

export const DictModal = ({isOpen, onClose, isErase, setIsErase}: {
    isOpen: boolean,
    onClose: () => void,
    isErase: boolean,
    setIsErase: any
}) => {
    const editWord: IDictionaryItem = useDictModal((state) => state.editWord)
    const isEasyForm: boolean = useUser((state) => state.currentUser.isEasyForm) // true - easy forms
    // const setIsEasyForm = useUser((state) => state.setIsEasyForm)
    const indexEditWord: number = useDictModal((state) => state.indexEditWord)
    const setWordToCurrentDict = useUser((state) => state.setWordToCurrentDict)
    const addWordToCurrentDict = useUser((state) => state.addWordToCurrentDict)
    const deleteWordFromCurrentDict = useUser((state) => state.deleteWordFromCurrentDict)
    const clearUserDict = useUser((state) => state.clearUserDict)
    const colorUI = useUser(store => store.currentUser.colorUI)
    const translations = useUser(store => store.translations)
    const language = useUser(store => store.currentUser.language)
    const [word, setWord] = useState<IDictionaryItem>(editWord)
    const [isErrorWord, setIsErrorWord] = useState(false)

    useEffect(() => {
        setWord(editWord)
    }, [editWord]);

    const handleChange = (event: any) => {
        setWord({...word, [event.target.name]: event.target.value})
    }

    const handlerDelete = () => {
        deleteWordFromCurrentDict(indexEditWord)
        setWord(emptyWord)
        onClose()
    }

    const handlerErase = () => {
        setIsErase(false)
        clearUserDict()
        onClose()
    }

    const handleClose = () => {
        setWord(emptyWord)
        setIsErase(false)
        onClose()
    }
    // const changeEasyForm = () => {
    //     setIsEasyForm()
    // }

    const handlerSubmit = () => {
        if (indexEditWord >= 0 && !isErrorWord) {
            setWordToCurrentDict(word, indexEditWord)

        } else {
            addWordToCurrentDict(word)
        }
        setWord(emptyWord)
        !isErrorWord && onClose()
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "Enter") {
            handlerSubmit()
        }
        if (event.key === "Escape") {
            handleClose();
        }
    };

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
            {!isErase &&
                <ModalContent onKeyDown={handleKeyDown}>
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
                        {/*<Button size={"sm"} onClick={changeEasyForm} mr={10}>*/}
                        {/*    {isEasyForm ? "Set normal form" : "Set easy form"}*/}
                        {/*</Button>*/}
                        <ModalCloseButton/>
                    </ModalHeader>

                    <FormControl onSubmit={handlerSubmit} onKeyDown={() => handleKeyDown}>
                        <ModalBody>
                            <InputDictItem item={"word"} value={word.word} handleChange={handleChange}/>
                            {!isEasyForm && <InputDictItem item={"transcription"} value={word.transcription}
                                                           handleChange={handleChange}/>}
                            {isEasyForm &&
                                <InputDictItem item={"translate"} value={word.translate} handleChange={handleChange}/>}
                            {!isEasyForm && <> <InputDictItem item={"phrase"} value={word.phrase}
                                                              handleChange={handleChange}/>
                                <InputDictItem item={"noun"} value={word.noun} handleChange={handleChange}/>
                                <InputDictItem item={"verb"} value={word.verb} handleChange={handleChange}/>
                                <InputDictItem item={"adjective"} value={word.adjective} handleChange={handleChange}/>
                                <InputDictItem item={"adverb"} value={word.adverb} handleChange={handleChange}/>
                                <InputDictItem item={"conjunction"} value={word.conjunction}
                                               handleChange={handleChange}/>
                                <InputDictItem item={"interjection"} value={word.interjection}
                                               handleChange={handleChange}/>
                                <InputDictItem item={"numeral"} value={word.numeral} handleChange={handleChange}/>
                                <InputDictItem item={"preposition"} value={word.preposition}
                                               handleChange={handleChange}/>
                                <InputDictItem item={"pronoun"} value={word.pronoun} handleChange={handleChange}/>
                            </>}
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
                                {translations[language].delete}
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
                                {translations[language].cancel}
                            </Button>

                        </ModalFooter>
                    </FormControl>

                </ModalContent>}
            {isErase && <ModalContent>
                <ModalBody>
                    <Text>{translations[language].doYouWantToClearDictionary}</Text>
                </ModalBody>
                <ModalFooter as={HStack}
                             justifyContent={"space-between"}>
                    <Button variant={"outline"}
                            colorScheme={colorUI}
                            size={{base: "sm", sm: "sm", md: "md", lg: "md", xl: "lg", "2xl": "lg"}}
                            onClick={handlerErase}>
                        {translations[language].sure}
                    </Button>
                    <Button variant={"outline"}
                            colorScheme={colorUI}
                            size={{base: "sm", sm: "sm", md: "md", lg: "md", xl: "lg", "2xl": "lg"}}
                            onClick={handleClose}>
                        {translations[language].notSure}

                    </Button>
                </ModalFooter>
            </ModalContent>}
        </Modal>
    )

}