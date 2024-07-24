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
import {useUI} from "../../../shared/store/zustand";
import ModalButtonYesOrNo from "../modal-button-yes-or-no.tsx";
import colorElement from "../../../features/common/color-element.ts";

interface IModalContentAddWordProps {
    onClose: () => void
}

const ModalContentAddWord = ({onClose}: IModalContentAddWordProps) => {
    const [inputMeanWord, setInputMeanWord] = useState('')
    const [inputTranslateWord, setInputTranslateWord] = useState('')
    const colorUI = useUI(store => store.colorUI)



    const handleConfirm = () => {
        console.log(inputTranslateWord, inputMeanWord)
        if (inputMeanWord && inputTranslateWord) {
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
                <Text color={colorElement(colorUI)}> Add Word</Text>
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
