import {
    FormControl,
    Input,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    Text
} from "@chakra-ui/react";
import {useState} from "react";
import {nanoid} from "nanoid";
import ModalButtonYesOrNo from "../modal-button-yes-or-no.tsx";
import useOptions from "../../../shared/hooks/use-options.tsx";
import {useUserStore} from "@/shared/store/zustand";
import {IVocabulary} from "@/shared/types/vocabulary-types.ts";

interface IModalContentAddVocabularyProps {
    onClose: () => void
}

const ModalContentAddVocabulary = ({onClose}: IModalContentAddVocabularyProps) => {
    const [inputNameVocabulary, setInputNameVocabulary] = useState('')
    const addVocabulary = useUserStore(store => store.addVocabulary)
    const {colorElement,gTrans} = useOptions()

    const handleConfirm = () => {
        const _vocabulary: IVocabulary = {
            name: inputNameVocabulary === '' ? 'Noname vocabulary' : inputNameVocabulary,
            id: nanoid(10),
            vocabulary: []
        }
        addVocabulary(_vocabulary)
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
                <Text color={colorElement}> {gTrans("Add new vocabulary")}</Text>
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
export default ModalContentAddVocabulary;
