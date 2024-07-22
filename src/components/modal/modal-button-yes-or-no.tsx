import { ModalFooter} from "@chakra-ui/react";
import ButtonYesOrNo from "../button-yes-or-no/button-yes-or-no.tsx";

interface IModalButtonYesOrNoProps {
    buttonOK: string
    buttonCancel: string
    handleConfirm: () => void
    handleClose: () => void
}

const ModalButtonYesOrNo = ({buttonOK, buttonCancel, handleConfirm, handleClose}: IModalButtonYesOrNoProps) => {

    return(
        <ModalFooter >
           <ButtonYesOrNo buttonOK={buttonOK} buttonCancel={buttonCancel} handleConfirm={handleConfirm} handleClose={handleClose}/>
        </ModalFooter>
    )
}
export default ModalButtonYesOrNo;