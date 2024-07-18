import {
    Button, Flex,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {useUser, useDictModal} from "../../shared/store/zustand";
import {useCallback, useState} from "react";
import {Fade} from "react-awesome-reveal";
import VocabulariesSwiper from "./vocabularies-swiper/vocabularies-swiper.tsx";
import {emptyWord} from "../../shared/store/constants-store";
import {buttonStyles} from "../../shared/ui/button-style.ts";
import {ModalCommon} from "../../components/modal/modal-common.tsx";
import {TModalOptions} from "../../shared/types.ts";

const VocabulariesPage = () => {
    const setEditWord = useDictModal(store => store.setEditWord)
    const colorUI = useUser(store => store.currentUser.colorUI)
    const isAuth = useUser(store => store.isAuth)
    const translations = useUser(store => store.translations)
    const language = useUser(store => store.currentUser.language)
    const {isOpen, onOpen, onClose} = useDisclosure()
    const removeVocabularies = useUser(store => store.removeVocabulary)
    const currentVocabulary = useUser(store => store.currentVocabulary)
    const [optionsModal, setOptionsModal] = useState<TModalOptions>("addWord")


    const handleMenuItemClick = useCallback((command: string) => {
        switch (command) {
            case "addWord":
                setEditWord(emptyWord, -1)
                onOpen()
                break;
            case "clear Dictionary":
                onOpen()
                break;
            case "add Vocabulary":
                // addVocabulary({...emptyVocabulary, id: nanoid(10)})
                setOptionsModal("addVocabulary")
                onOpen()
                console.log("addVocabulary")
                break;
            case 'remove Vocabulary':
                console.log("vocabularyPage", currentVocabulary.id)
                removeVocabularies()
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
                {isAuth && <Flex alignItems={"center"}
                                 alignSelf={"center"}
                                 justifyContent={"space-around"}
                                 flexDirection={"row"}
                                 flexWrap={"wrap"}
                                 w={"70%"}
                                 gap={2}
                                 paddingTop={2}
                                 maxW={"720px"}
                >
                  <Button
                    isDisabled={currentVocabulary.id === "default"}
                    {...buttonStyles(colorUI)}
                    onClick={() => handleMenuItemClick("addWord")}>
                      {translations[language].addWord}
                  </Button>
                  <Button
                    isDisabled={currentVocabulary.id === "default" || currentVocabulary.vocabulary.length === 0}
                    {...buttonStyles(colorUI)}
                    onClick={() => handleMenuItemClick("clear Dictionary")}>
                      {translations[language].clearDictionary}
                  </Button>
                  <Button
                    isDisabled={currentVocabulary.id === "default"}
                    {...buttonStyles(colorUI)}
                    onClick={() => handleMenuItemClick("remove Vocabulary")}>
                      {"remove Vocabulary"}
                  </Button>
                  <Button
                      {...buttonStyles(colorUI)}
                      onClick={() => handleMenuItemClick("add Vocabulary")}>
                      {"add Vocabulary"}
                  </Button>
                </Flex>}
                <VocabulariesSwiper isOpen={isOpen} onOpen={onOpen}/>
                <ModalCommon isOpen={isOpen} onClose={onClose} optionsModal={optionsModal}/>
                {/*<DictModal isOpen={isOpen} onClose={onClose} isErase={isErase} setIsErase={setIsErase}/>*/}
            </VStack>
        </Fade>

    )
}

export default VocabulariesPage;