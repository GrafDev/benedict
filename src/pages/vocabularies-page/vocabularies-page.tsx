import {
    Button, Flex,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {useCommonStore} from "../../shared/store/zustand";
import {useCallback,  useState} from "react";
import {Fade} from "react-awesome-reveal";
import VocabulariesSwiper from "./vocabularies-swiper/vocabularies-swiper.tsx";
import {ModalCommon} from "../../components/modal/modal-common.tsx";
import {TModalOptions} from "../../shared/types/timer-types.ts";
import useOptions from "../../shared/hooks/use-options.tsx";
import useVocabulary from "../../shared/hooks/use-vocabulary.tsx";

const VocabulariesPage = () => {
    const {buttonStyle,gTrans} = useOptions()
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
            case "save Vocabulary":
                setOptionsModal("saveVocabulary")
                onOpen()
                console.log("saveVocabulary")
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
                        {...buttonStyle}
                        onClick={() => handleButtonsClick("add Vocabulary")}>
                        {gTrans("add Vocabulary")}
                    </Button>

                    <Button
                        {...buttonStyle}
                        isDisabled={checkedItems.length === 0}
                        onClick={() => handleButtonsClick("copy Words")}>
                        {gTrans("Copy words")}
                    </Button>
                    <Button
                        {...buttonStyle}
                        isDisabled={currentVocabulary.vocabulary.length === 0}
                        onClick={() => handleButtonsClick("save Vocabulary")}>
                        {gTrans("save Vocabulary")}
                    </Button>
                    {currentVocabulary.id !== "default" &&
                      <Button
                          {...buttonStyle}
                          onClick={() => handleButtonsClick("remove Vocabulary")}>
                          {gTrans("remove Vocabulary")}
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
