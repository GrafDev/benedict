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
import {useUserStore} from "../../../shared/store/zustand";
import ModalButtonYesOrNo from "../modal-button-yes-or-no.tsx";
import useOptions from "../../../shared/hooks/use-options.tsx";
import useVocabulary from "../../../shared/hooks/use-vocabulary.tsx";
import {IVocabulary} from "../../../shared/types/vocabulary-types.ts";

interface IModalContentAddVocabularyProps {
    onClose: () => void
    receivedCurrentVocabulary?: IVocabulary
}

const ModalContentRenameVocabulary = ({onClose, receivedCurrentVocabulary}: IModalContentAddVocabularyProps) => {
    const [inputNameVocabulary, setInputNameVocabulary] = useState('')
    const setVocabularyName = useUserStore(store => store.setVocabularyName)
    const listVocabularies = useUserStore(store => store.listVocabularies)
    const setCurrentVocabularyIndex = useUserStore(store => store.setCurrentVocabularyIndex)
    const [nameToHeading, setNameToHeading] = useState("")
    const {currentVocabulary} = useVocabulary()
    const {colorElement, gTrans} = useOptions()
    console.log(receivedCurrentVocabulary, "receivedCurrentVocabulary")

    useEffect(() => {
        if (receivedCurrentVocabulary) {
            setInputNameVocabulary(receivedCurrentVocabulary.name)
            setNameToHeading(receivedCurrentVocabulary.name)
        } else {
            setInputNameVocabulary(currentVocabulary.name)
            setNameToHeading(currentVocabulary.name)
        }

    }, []);

    const handleConfirm = () => {
        if (receivedCurrentVocabulary) {
            const index = listVocabularies.findIndex((vocabulary: IVocabulary) => vocabulary.id === receivedCurrentVocabulary.id)
            setCurrentVocabularyIndex(index)
        }
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
                <Text color={colorElement}> {gTrans("Rename")}
                    <Text fontWeight={"bold"} fontStyle={"italic"}>{nameToHeading}</Text>
                </Text>
                <ModalCloseButton/>
            </ModalHeader>

            <ModalBody>
                <FormControl>
                    <Input type={"text"}
                           value={inputNameVocabulary}
                           onChange={(e) => handleInputChange(e)}
                           autoComplete="nope"
                           placeholder={gTrans("Name your vocabulary")}/>

                </FormControl>
            </ModalBody>
            <ModalButtonYesOrNo buttonOK={gTrans("Ok")} buttonCancel={gTrans("Cancel")} handleConfirm={handleConfirm}
                                handleClose={handleClose}/>
        </ModalContent>
    )
}
export default ModalContentRenameVocabulary;
