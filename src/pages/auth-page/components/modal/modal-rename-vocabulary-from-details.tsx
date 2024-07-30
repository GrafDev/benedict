import {
    Modal,
    ModalOverlay,
} from "@chakra-ui/react";
import {IVocabulary} from "../../../../shared/types/vocabulary-types.ts";
import ModalContentRenameVocabulary
    from "../../../../components/modal/modal-rename-vocabulary/modal-content-rename-vocabulary.tsx";

interface IModalCommonProps {
    isOpen: boolean
    onClose: () => void
    receivedCurrentVocabulary: IVocabulary
}

export const ModalRenameVocabularyFromDetails: React.FC<IModalCommonProps> = ({
                                                                           isOpen,
                                                                           onClose,
                                                                           receivedCurrentVocabulary,
                                                                       }: IModalCommonProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onOverlayClick={onClose}
            isCentered>
            <ModalOverlay/>
            <ModalContentRenameVocabulary receivedCurrentVocabulary={receivedCurrentVocabulary} onClose={onClose}/>
        </Modal>
    )
}