import {
    Button, Flex,
    useColorModeValue, useDisclosure,
    VStack
} from "@chakra-ui/react";
import {DictModal} from "./dict-modal";
import {useUser, useDictModal} from "../../shared/store/zustand";
import {useCallback, useState} from "react";
import {emptyWord} from "../../shared/store/constants-store";
import {Fade} from "react-awesome-reveal";
import VocabulariesSwiper from "./vocabulries-swiper/vocabularies-swiper.tsx";
import {IVocabularyItem} from "../../shared/types.ts";

const VocabulariesPage = () => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const setEditWord = useDictModal(store => store.setEditWord)
    const setIsUserDict = useUser(store => store.setIsUserDictionary)
    const colorUI = useUser(store => store.currentUser.colorUI)
    const isAuth = useUser(store => store.isAuth)
    const isUserDictionary = useUser(store => store.currentUser.isUserDictionary)
    const translations = useUser(store => store.translations)
    const language = useUser(store => store.currentUser.language)
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [isErase, setIsErase] = useState<boolean>(false)

    const listOfVocabularies: IVocabularyItem[][]= useUser(store => store.listOfVocabularies)


    const handleMenuItemClick = useCallback((command: string) => {
        switch (command) {
            case "addWord":
                setIsErase(false)
                setEditWord(emptyWord, -1)
                onOpen()
                break;
            case "change Dictionary":
                setIsErase(false)
                setIsUserDict()
                break;
            case "clear Dictionary":
                setIsErase(true)
                onOpen()
                break;
            default:
                break;

        }
    }, []);


    const buttonStyles = {
        w: "fit-content",
        minW: '200px',
        rounded: 100,
        m: 1,
        px: 10,
        colorScheme: colorUI,
        boxShadow: 'md',
        // border: '2px solid',
        _hover: {
            // background: isDark ? 'gray.800' : 'gray.300',
            boxShadow: 'dark-lg',
            transform: 'scale(1.03)',
            border: isDark ? "2px solid " + colorUI : undefined
        },
    };
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
                                 paddingTop={2}
                                 maxW={"720px"}
                >
                  <Button
                    isDisabled={!isUserDictionary}
                    {...buttonStyles}
                    onClick={() => handleMenuItemClick("addWord")}>
                      {translations[language].addWord}
                  </Button>
                    {isUserDictionary && <Button {...buttonStyles}
                                                 onClick={() => handleMenuItemClick("clear Dictionary")}>
                        {translations[language].clearDictionary}

                    </Button>}

                </Flex>}

                <VocabulariesSwiper listOfVocabularies={listOfVocabularies} isOpen={isOpen} onOpen={onOpen}/>
                <DictModal isOpen={isOpen} onClose={onClose} isErase={isErase} setIsErase={setIsErase}/>
            </VStack>
        </Fade>

    )
}

export default VocabulariesPage;