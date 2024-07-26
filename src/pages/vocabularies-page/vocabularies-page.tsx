import {
    Button, Flex,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {useCommonStore} from "../../shared/store/zustand";
import {useCallback, useState} from "react";
import {Fade} from "react-awesome-reveal";
import VocabulariesSwiper from "./vocabularies-swiper/vocabularies-swiper.tsx";
import {buttonStyles} from "../../shared/ui/button-style.ts";
import {ModalCommon} from "../../components/modal/modal-common.tsx";
import {TModalOptions} from "../../shared/types/timer-types.ts";
import useUI from "../../shared/hooks/use-ui.tsx";
import useVocabulary from "../../shared/hooks/use-vocabulary.tsx";

const VocabulariesPage = () => {
    const {colorUI} = useUI()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {currentVocabulary} = useVocabulary()
    const [optionsModal, setOptionsModal] = useState<TModalOptions>("")
    const checkedItems = useCommonStore(store => store.checkedItems)

    const handleButtonsClick = useCallback((command: string) => {
        switch (command) {
            case "add Vocabulary":
                // addVocabulary({...emptyVocabulary, id: nanoid(10)})
                setOptionsModal("addVocabulary")
                onOpen()
                console.log("addVocabulary")
                break;
            case "copy Words":
                setOptionsModal("copyWords")
                onOpen()
                console.log("copyWords")
                break;
            case 'remove Vocabulary':
                setOptionsModal("removeVocabulary")
                onOpen()
                console.log("vocabularyPage", currentVocabulary.id)
                break;
            default:
                break;
        }
    }, []);

    return (
        <Fade>
            <VStack
                className={"VStack"}
                display={"flex"}
                justifySelf={"start"}
                justifyContent={"start"}
                alignItems={'center'}
                w={"100%"}
                h={"100%"}
                fontSize={{base: "lg", sm: "lg", md: "large", lg: "large", xl: "x-large", "2xl": "xx-large"}}
            >
                <Flex alignItems={"center"}
                      alignSelf={"center"}
                      justifyContent={"space-around"}
                      flexDirection={"row"}
                      flexWrap={"wrap"}
                      w={"70%"}
                      gap={2}
                      paddingTop={4}
                      paddingBottom={2}
                      maxW={"720px"}
                >
                    <Button
                        {...buttonStyles(colorUI)}
                        onClick={() => handleButtonsClick("add Vocabulary")}>
                        {"add Vocabulary"}
                    </Button>

                    <Button
                        {...buttonStyles(colorUI)}
                        isDisabled={checkedItems.length === 0}
                        onClick={() => handleButtonsClick("copy Words")}>
                        Copy words
                    </Button>
                    {currentVocabulary.id !== "default" &&
                      <Button
                          {...buttonStyles(colorUI)}
                          onClick={() => handleButtonsClick("remove Vocabulary")}>
                          {"remove Vocabulary"}
                      </Button>}

                </Flex>
                <VocabulariesSwiper onOpen={onOpen} onClose={onClose} setOptionsModal={setOptionsModal}
                                    optionsModal={optionsModal}/>
                <ModalCommon isOpen={isOpen} onClose={onClose} optionsModal={optionsModal}/>
            </VStack>
        </Fade>

    )
}

export default VocabulariesPage;