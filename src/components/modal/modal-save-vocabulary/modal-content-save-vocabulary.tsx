import {
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    Text
} from "@chakra-ui/react";
import ModalButtonYesOrNo from "../modal-button-yes-or-no.tsx";
import useVocabulary from "../../../shared/hooks/use-vocabulary.tsx";
import useOptions from "../../../shared/hooks/use-options.tsx";
import React from "react";

interface IModalContentSaveVocabularyProps {
    onClose: () => void
}

const ModalContentSaveVocabulary = ({onClose}: IModalContentSaveVocabularyProps) => {
    const {gTrans} = useOptions()
    const {currentVocabulary} = useVocabulary()

    const handleSaveVocabulary = () => {
        try {
            // Создаем упрощенную версию словаря только со значениями и переводами
            const simplifiedVocabulary = {
                name: currentVocabulary.name,
                vocabulary: currentVocabulary.vocabulary.map(item => ({
                    mean: item.mean,
                    translate: item.translate
                }))
            };

            // Преобразуем упрощенный словарь в JSON строку
            const vocabularyJSON = JSON.stringify(simplifiedVocabulary, null, 2);

            // Создаем Blob с типом application/json
            const blob = new Blob([vocabularyJSON], { type: 'application/json' });

            // Создаем URL для Blob
            const url = URL.createObjectURL(blob);

            // Создаем временную ссылку для скачивания
            const link = document.createElement('a');
            link.href = url;
            link.download = `${currentVocabulary.name}.json`;

            // Добавляем ссылку в DOM, кликаем на неё и удаляем
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Освобождаем URL
            URL.revokeObjectURL(url);

            // Закрываем модальное окно
            onClose();
        } catch (error) {
            console.error("Error saving vocabulary:", error);
            // Здесь можно добавить обработку ошибок, например, показать уведомление
        }
    }

    const handleClose = () => {
        onClose();
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "Enter") {
            handleSaveVocabulary();
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
                    {`${gTrans("Do you want to save file")} ${currentVocabulary.name}.json?`}
                </Text>
                <ModalCloseButton/>
            </ModalHeader>

            <ModalButtonYesOrNo
                buttonOK={gTrans("Save")}
                buttonCancel={gTrans("Cancel")}
                handleConfirm={handleSaveVocabulary}
                handleClose={handleClose}
            />
        </ModalContent>
    )
}

export default ModalContentSaveVocabulary;
