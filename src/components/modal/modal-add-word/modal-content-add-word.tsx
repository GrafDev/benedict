import {
    FormControl,
    Input,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    Text, VStack
} from "@chakra-ui/react";
import {useState} from "react";
import {useUser} from "../../../shared/store/zustand";
import ModalButtonYesOrNo from "../modal-button-yes-or-no.tsx";
import {IVocabularyItem} from "../../../shared/types.ts";
import {nanoid} from "nanoid";

interface IModalContentAddWordProps {
    onClose: () => void
}

const ModalContentAddWord = ({onClose}: IModalContentAddWordProps) => {
    const [inputMeanWord, setInputMeanWord] = useState('')
    const [inputTranslateWord, setInputTranslateWord] = useState('')
    const addWordToCurrentVocabulary= useUser(store => store.addWordToCurrentVocabulary)
    const colorUI = useUser(store => store.currentUser.colorUI)
const colorElement = `${colorUI}.600`

    const handleConfirm = () => {
        if (inputMeanWord && inputTranslateWord) {
            const word:IVocabularyItem={
                id:nanoid(10),
                mean:inputMeanWord,
                translate:inputTranslateWord,
                learning:0,
                popular:0,
            }
            addWordToCurrentVocabulary(word)
            onClose()
        }
    }

    const handleClose = () => {
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
                <Text color={colorElement}> Add Word</Text>
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
            <ModalButtonYesOrNo buttonOK={"Add"} buttonCancel={"Cancel"} handleConfirm={handleConfirm}
                                handleClose={handleClose}/>
        </ModalContent>
    )
}
export default ModalContentAddWord;
