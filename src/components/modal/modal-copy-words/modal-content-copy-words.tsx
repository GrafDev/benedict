import {
    FormControl,
    Select,
    Input,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    Text,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useCommon, useUser} from "../../../shared/store/zustand";
import {nanoid} from "nanoid";
import ModalButtonYesOrNo from "../modal-button-yes-or-no.tsx";
import {emptyVocabulary} from "../../../shared/store/constants-store/vocabularies/empty-vocabulary.ts";

interface IVocabulary {
    name: string;
    id: string;
    vocabulary: any[]; // Замените 'any' на конкретный тип для элементов словаря
}

interface IModalContentAddVocabularyProps {
    onClose: () => void
}

const ModalContentCopyWords = ({onClose}: IModalContentAddVocabularyProps) => {
    const [inputNameVocabulary, setInputNameVocabulary] = useState<string>('')
    const colorUI = useUser(store => store.currentUser.colorUI)
    const addVocabulary = useUser(store => store.addVocabulary)
    const listVocabularies = useUser(store => store.listVocabularies)
    const checkedItems = useCommon(store => store.checkedItems)
    const [newListVocabularies, setNewListVocabularies] = useState<IVocabulary[]>([emptyVocabulary, ...[...listVocabularies].reverse()])
    const [selectedVocabulary, setSelectedVocabulary] = useState<IVocabulary | null>(null);
    const [isChooseNewVocabulary, setIsChooseNewVocabulary] = useState<boolean>(true);
    const addWordsToCurrentVocabulary = useUser(store => store.addWordsToCurrentVocabulary)
    const clearCheckedItems = useCommon(store => store.clearCheckedItems)

    const handleConfirm = () => {
        if (isChooseNewVocabulary) {
            addVocabulary({
                name: inputNameVocabulary === '' ? 'Noname vocabulary' : inputNameVocabulary,
                id: nanoid(10),
                vocabulary: [...checkedItems]
            })
         } else {
            for (const vocabulary of listVocabularies) {
                if (vocabulary.id === selectedVocabulary?.id) {
                    addWordsToCurrentVocabulary([...checkedItems])
                }
            }

        }
        clearCheckedItems()
        onClose()
    }

    useEffect(() => {
        const listVocabularies = [...newListVocabularies]
        listVocabularies.pop()
        setNewListVocabularies([...listVocabularies])
    }, []);

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

    const changeVocabulary = (e: any) => {
        const selectedIndex = e.target.selectedIndex;
        setIsChooseNewVocabulary(selectedIndex === 0);
        const selectedVocab = newListVocabularies[selectedIndex];
        setSelectedVocabulary(selectedVocab);
        console.log("Selected vocabulary:", {
            name: selectedVocab.name,
            id: selectedVocab.id
        });
    }

    return (
        <ModalContent onKeyDown={handleKeyDown}>
            <ModalHeader justifyItems={"space-between"}
                         alignItems={"center"}
                         display={"flex"}
                         justifyContent={"space-between"}
                         ml={5}>
                <Text color={colorUI}> Add Vocabulary</Text>
                <ModalCloseButton/>
            </ModalHeader>

            <ModalBody>
                <Select
                    size={{base: "sm", md: "md", lg: "lg"}}
                    mb={2}
                    onChange={changeVocabulary}
                    value={selectedVocabulary ? selectedVocabulary.name : ""}
                >
                    {newListVocabularies.map((vocabulary, index) => {
                        let name = vocabulary.name;
                        if (index === 0) {
                            name = "Make New vocabulary"
                            vocabulary.id = "nanoid(10)"
                        }

                        return (
                            <option key={vocabulary.id} value={vocabulary.name}>
                                {name}
                            </option>
                        );
                    })}
                </Select>

                <FormControl>
                    <Input type={"text"}
                           isDisabled={!isChooseNewVocabulary}
                           value={inputNameVocabulary}
                           size={{base: "sm", md: "md", lg: "lg"}}
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

export default ModalContentCopyWords;