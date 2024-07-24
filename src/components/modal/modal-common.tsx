import {
   Modal,
    ModalOverlay,
} from "@chakra-ui/react";
import {TModalOptions} from "../../shared/types/timer-types.ts";
import ModalContentAddVocabulary from "./modal-add-vocabulary/modal-content-add-vocabulary.tsx";
import ModalContentRemoveVocabulary from "./modal-remove-vocabulary/modal-content-remove-vocabulary.tsx";
import ModalContentAddWord from "./modal-add-word/modal-content-add-word.tsx";
import ModalContentRenameVocabulary from "./modal-rename-vocabulary/modal-content-rename-vocabulary.tsx";
import ModalContentCopyWords from "./modal-copy-words/modal-content-copy-words.tsx";
import ModalContentEditWord from "./modal-edit-word/modal-content-edit-word.tsx";

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
            {optionsModal === "copyWords" ? <ModalContentCopyWords onClose={onClose}/> : null}
            {optionsModal === "editWord" ? <ModalContentEditWord onClose={onClose}/> : null}


        </Modal>
    )
}