import {
    Button, Flex,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {useUser} from "../../shared/store/zustand";
import {useCallback, useState} from "react";
import {Fade} from "react-awesome-reveal";
import VocabulariesSwiper from "./vocabularies-swiper/vocabularies-swiper.tsx";
import {buttonStyles} from "../../shared/ui/button-style.ts";
import {ModalCommon} from "../../components/modal/modal-common.tsx";
import {TModalOptions} from "../../shared/types.ts";

const VocabulariesPage = () => {
    const colorUI = useUser(store => store.currentUser.colorUI)
    const isAuth = useUser(store => store.isAuth)
    const {isOpen, onOpen, onClose} = useDisclosure()
    const currentVocabulary = useUser(store => store.currentVocabulary)
    const [optionsModal, setOptionsModal] = useState<TModalOptions>("")


    const handleMenuItemClick = useCallback((command: string) => {
        switch (command) {
            case "add Vocabulary":
                // addVocabulary({...emptyVocabulary, id: nanoid(10)})
                setOptionsModal("addVocabulary")
                onOpen()
                console.log("addVocabulary")
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
                {isAuth && <Flex alignItems={"center"}
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
                <VocabulariesSwiper  onOpen={onOpen} onClose={onClose} setOptionsModal={setOptionsModal} optionsModal={optionsModal}/>
                <ModalCommon isOpen={isOpen} onClose={onClose} optionsModal={optionsModal}/>
                {/*<DictModal isOpen={isOpen} onClose={onClose} isErase={isErase} setIsErase={setIsErase}/>*/}
            </VStack>
        </Fade>

    )
}

export default VocabulariesPage;