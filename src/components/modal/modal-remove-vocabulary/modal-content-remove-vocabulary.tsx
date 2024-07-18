import {
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    Text
} from "@chakra-ui/react";
import {useUser} from "../../../shared/store/zustand";
import ModalButtonYesOrNo from "../modal-button-yes-or-no.tsx";

interface IModalContentAddVocabularyProps {
    onClose: () => void
}

const ModalContentRemoveVocabulary = ({onClose}: IModalContentAddVocabularyProps) => {
    const removeCurrentVocabulary = useUser(store => store.removeCurrentVocabulary)
const currentVocabulary = useUser(store => store.currentVocabulary)

    const handleConfirm = () => {
      removeCurrentVocabulary()
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



    return (

        <ModalContent onKeyDown={handleKeyDown}>
            <ModalHeader justifyItems={"space-between"}
                         alignItems={"center"}
                         display={"flex"}
                         justifyContent={"space-between"}
                         ml={5}>
                <Text px={10}>
                    {`Are you sure you want to remove ${currentVocabulary.name}?`}
                </Text>
                <ModalCloseButton/>
            </ModalHeader>

            <ModalButtonYesOrNo buttonOK={"Sure"} buttonCancel={"Not sure"} handleConfirm={handleConfirm}
                                handleClose={handleClose}/>
        </ModalContent>
    )
}
export default ModalContentRemoveVocabulary;
