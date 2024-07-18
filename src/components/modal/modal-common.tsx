import {
    Button, FormControl, FormLabel, HStack, Input, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import {nanoid} from "nanoid";
import {Text} from "@chakra-ui/react";
import {buttonStyles} from "../../shared/ui/button-style.ts";
import {useUser} from "../../shared/store/zustand";
import {TModalOptions} from "../../shared/types.ts";
import {useState} from "react";

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
    const colorUI = useUser(store => store.currentUser.colorUI)
    const [inputNameVocabulary, setInputNameVocabulary] = useState('')
    const addVocabulary = useUser(store => store.addVocabulary)

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault()
        setInputNameVocabulary(e.target.value)

    }


    const handleClose = () => {
        onClose()
    }

    const handleConfirm = () => {
        if (optionsModal === "addVocabulary") {
            addVocabulary({name: inputNameVocabulary===''?'Noname vocabulary':inputNameVocabulary, id: nanoid(10), vocabulary: []})
        }
        setInputNameVocabulary("")
        handleClose()
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
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            onOverlayClick={handleClose}
            isCentered>
            <ModalOverlay/>
            <ModalContent onKeyDown={handleKeyDown}>
                <ModalHeader justifyItems={"space-between"}
                             alignItems={"center"}
                             display={"flex"}
                             justifyContent={"space-between"}
                             ml={5}>

                    {optionsModal === "addVocabulary" &&
                      <Text color={colorUI}> Add Vocabulary</Text>}
                    <ModalCloseButton/>
                </ModalHeader>

                <ModalBody>
                    {optionsModal === "addVocabulary" &&
                      <FormControl>
                        <FormLabel>Name your vocabulary</FormLabel>
                        <Input type={"text"} value={inputNameVocabulary} onChange={(e)=>handleInputChange(e)} />
                      </FormControl>}
                </ModalBody>

                <ModalFooter as={HStack}
                             justifyContent={"space-between"}>
                    <Button variant={"outline"}
                            {...buttonStyles(colorUI)}
                            w={"fit-content"}
                            maxW={"auto"}
                            minW={"auto"}
                            border={ `2px solid`}
                            borderColor={colorUI}
                            onClick={handleConfirm}>
                        <Text> Ok </Text>
                    </Button>
                    <Button variant={"outline"}
                            {...buttonStyles(colorUI)}
                            w={"fit-content"}
                            maxW={"auto"}
                            minW={"auto"}
                            border={ ` 2px solid`}
                            borderColor={colorUI}
                            onClick={handleClose}>
                        <Text> Cancel </Text>
                    </Button>
                </ModalFooter>


            </ModalContent>
        </Modal>
    )
}