import {
    Button,
    FormControl, HStack,
    Input,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    Text, VStack
} from "@chakra-ui/react";
import {useState} from "react";
import {useDictModal, useUI, useUser} from "../../../shared/store/zustand";
import {buttonStyles} from "../../../shared/ui/button-style.ts";
import {IVocabularyItem} from "../../../shared/types/vocabulary-types.ts";
import colorElement from "../../../features/common/color-element.ts";

interface IModalContentAddWordProps {
    onClose: () => void
}

const ModalContentEditWord = ({onClose}: IModalContentAddWordProps) => {
    const wordId = useDictModal(store => store.editWord.id)
    const word = useDictModal(store => store.editWord)
    const indexEditWord = useDictModal(store => store.indexEditWord)
    const [inputMeanWord, setInputMeanWord] = useState(word.mean)
    const [inputTranslateWord, setInputTranslateWord] = useState(word.translate)
    const editWordInCurrentVocabulary = useUser(store => store.editWordInCurrentVocabulary)
    const deleteWordFromCurrentVocabulary = useUser(store => store.deleteWordFromCurrentVocabulary)
    const colorUI = useUI(store => store.colorUI)

    const handleConfirm = () => {
        if (inputMeanWord && inputTranslateWord) {
            const _word: IVocabularyItem = {
                id: word.id,
                mean: inputMeanWord,
                translate: inputTranslateWord,
                learning: word.mean === inputMeanWord ? word.learning : 0,
                popular: word.mean === inputMeanWord ? word.popular : 0,
            }
            editWordInCurrentVocabulary(_word, indexEditWord)

            console.log("editWord", inputMeanWord, inputTranslateWord, wordId, indexEditWord)
            onClose()
        }
    }

    const handleClose = () => {
        onClose()
    }

    const handlerDelete = () => {
        deleteWordFromCurrentVocabulary(indexEditWord)
        onClose()
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "Enter") {
            handleConfirm()
        }
        if (event.key === "Escape") {
            handleClose();
        }
    };

    const handleInputChangeMean = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setInputMeanWord(e.target.value)
    }
    const handleInputChangeTranslate = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setInputTranslateWord(e.target.value)
    }


    return (

        <ModalContent onKeyDown={handleKeyDown}>
            <ModalHeader justifyItems={"space-between"}
                         alignItems={"center"}
                         display={"flex"}
                         justifyContent={"space-between"}
                         ml={5}>
                <Text color={colorElement(colorUI)}> Edit Word</Text>
                <ModalCloseButton/>
            </ModalHeader>

            <ModalBody>
                <FormControl as={VStack}
                             gap={2}
                >
                    <Input type={"text"}
                           value={inputMeanWord}
                           required={true}
                           isInvalid={!inputMeanWord}
                           onChange={(e) => handleInputChangeMean(e)}
                           autoComplete="nope"
                           placeholder={"word"}/>
                    <Input type={"text"}
                           value={inputTranslateWord}
                           required={true}
                           isInvalid={!inputTranslateWord}
                           onChange={(e) => handleInputChangeTranslate(e)}
                           autoComplete="nope"
                           placeholder={"word's translation"}/>
                </FormControl>
            </ModalBody>
            <ModalFooter>
                <HStack as={HStack} w={"full"}
                        justifyContent={"space-around"}>

                    <Button variant={"outline"}
                            {...buttonStyles(colorUI)}
                            w={"fit-content"}
                            maxW={"auto"}
                            minW={"90px"}
                            type={'button'}
                            fontWeight={"bold"}
                            border={`2px solid`}
                            borderColor={colorElement(colorUI)}
                            onClick={handleConfirm}>
                        <Text> Edit </Text>
                    </Button>
                    <Button variant={"outline"}
                            {...buttonStyles(colorUI)}
                            w={"fit-content"}
                            maxW={"auto"}
                            minW={"90px"}
                            border={` 1px solid`}
                            borderColor={colorElement(colorUI)}
                            onClick={handleClose}>
                        <Text> Cancel</Text>
                    </Button>
                    <Button variant={"outline"}
                            {...buttonStyles(colorUI)}
                            w={"fit-content"}
                            maxW={"auto"}
                            minW={"90px"}
                            type={'button'}
                            fontWeight={"bold"}
                            border={`1px solid`}
                            borderColor={"red.600"}
                            onClick={handlerDelete}>
                        <Text color={"red.600"}> Delete </Text>
                    </Button>
                </HStack>
            </ModalFooter>
        </ModalContent>
    )
}
export default ModalContentEditWord;