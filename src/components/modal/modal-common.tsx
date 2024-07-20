import {
   Modal,
    ModalOverlay,
} from "@chakra-ui/react";
import {TModalOptions} from "../../shared/types.ts";
import ModalContentAddVocabulary from "./modal-add-vocabulary/modal-content-add-vocabulary.tsx";
import ModalContentRemoveVocabulary from "./modal-remove-vocabulary/modal-content-remove-vocabulary.tsx";
import ModalContentAddWord from "./modal-add-Word/modal-content-add-word.tsx";
import ModalContentRenameVocabulary from "./modal-rename-vocabulary/modal-content-rename-vocabulary.tsx";

interface IModalCommonProps {
    isOpen: boolean
    optionsModal: TModalOptions
    onClose: () => void
}

export const ModalCommon: React.FC<IModalCommonProps> = ({
                                                             isOpen,
                                                             onClose,
                                                             optionsModal,
                                                         }: IModalCommonProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onOverlayClick={onClose}
            isCentered>
            <ModalOverlay/>
            {optionsModal === "addVocabulary" ? <ModalContentAddVocabulary onClose={onClose}/> : null}
            {optionsModal === "removeVocabulary" ? <ModalContentRemoveVocabulary onClose={onClose}/> : null}
            {optionsModal === "addWord" ? <ModalContentAddWord onClose={onClose}/> : null}
            {optionsModal === "renameVocabulary" ? <ModalContentRenameVocabulary onClose={onClose}/> : null}


        </Modal>
    )
}