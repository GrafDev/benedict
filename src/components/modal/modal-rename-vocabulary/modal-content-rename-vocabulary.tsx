import {
    FormControl,
    Input,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    Text
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useUI, useUser} from "../../../shared/store/zustand";
import ModalButtonYesOrNo from "../modal-button-yes-or-no.tsx";
import colorElement from "../../../features/common/color-element.ts";

interface IModalContentAddVocabularyProps {
    onClose: () => void
}

const ModalContentRenameVocabulary = ({onClose}: IModalContentAddVocabularyProps) => {
    const [inputNameVocabulary, setInputNameVocabulary] = useState('')
    const colorUI = useUI(store => store.colorUI)
    const setVocabularyName = useUser(store => store.setVocabularyName)
    const currentVocabulary = useUser(store => store.currentVocabulary)

    useEffect(() => {
        setInputNameVocabulary(currentVocabulary.name)
    }, []);

    const handleConfirm = () => {
        setVocabularyName(inputNameVocabulary === '' ? 'Noname vocabulary' : inputNameVocabulary)
        setInputNameVocabulary("")
        onClose()
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setInputNameVocabulary(e.target.value)

    }


    return (

        <ModalContent onKeyDown={handleKeyDown}>
            <ModalHeader justifyItems={"space-between"}
                         alignItems={"center"}
                         display={"flex"}
                         justifyContent={"space-between"}
                         ml={5}>
                <Text color={colorElement(colorUI)}> Rename
                    <Text fontWeight={"bold"} fontStyle={"italic"}>{currentVocabulary.name}</Text>
                </Text>
                <ModalCloseButton/>
            </ModalHeader>

            <ModalBody>
                <FormControl>
                    <Input type={"text"}
                           value={inputNameVocabulary}
                           onChange={(e) => handleInputChange(e)}
                           autoComplete="nope"
                           placeholder={"Name your vocabulary"}/>

                </FormControl>
            </ModalBody>
            <ModalButtonYesOrNo buttonOK={"Ok"} buttonCancel={"Cancel"} handleConfirm={handleConfirm}
                                handleClose={handleClose}/>
        </ModalContent>
    )
}
export default ModalContentRenameVocabulary;
