import {
    Button, Flex, Grid,
    useColorModeValue, useDisclosure,
    VStack
} from "@chakra-ui/react";
import {ListOfDictionary} from "../../widgets/list-of-dictionary";
import AutoSizer from "react-virtualized-auto-sizer";
import {DictModal} from "../../widgets/dict-modal";
import {useUser, useDictModal} from "../../shared/store/zustand";
import {useCallback, useState} from "react";
import {emptyWord} from "../../shared/store/constants-store";

export const DictionariesPage = () => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const setEditWord = useDictModal(store => store.setEditWord)
    const setIsUserDict = useUser(store => store.setIsUserDictionary)
    const colorUI = useUser(store => store.currentUser.colorUI)
    const isAuth = useUser(store => store.isAuth)
    const isUserDictionary = useUser(store => store.currentUser.isUserDictionary)
    const translations = useUser(store => store.translations)
    const language = useUser(store => store.currentUser.language)
    const isEasyDict= useUser(store => store.isEasyDict)
    const setIsEasyDict= useUser(store => store.setIsEasyDict)
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [isErase, setIsErase] = useState<boolean>(false)


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
            case "easy Dictionary":
                setIsEasyDict()
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

        <VStack
            display={"flex"}
            justifySelf={"start"}
            justifyContent={"start"}
            alignItems={"left"}
            w={"100%"}
            h={"100%"}
            p={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
            fontSize={{base: "lg", sm: "lg", md: "large", lg: "large", xl: "x-large", "2xl": "xx-large"}}
        >
            {isAuth && <Flex alignItems={"center"}
                              justifyItems={"center"}
                              alignSelf={"center"}
                              justifyContent={"space-around"}
                              flexDirection={"row"}
                              flexWrap={"wrap"}
                              w={"70%"}
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
                {!isUserDictionary && <Button {...buttonStyles}
                                             onClick={() => handleMenuItemClick("easy Dictionary")}>
                    {isEasyDict?translations[language].advancedDictionary:translations[language].easyDictionary}

                </Button>}
                <Button {...buttonStyles}
                        onClick={() => handleMenuItemClick("change Dictionary")}>
                    {translations[language].changeDictionary}

                </Button>
            </Flex>}
            <Grid className={"list-of-dictionary BOX-Before AutoSizer"}
                  templateRows={"auto 1fr auto"}
                  h={"100%"}
                  w={"97%"}
                  maxW={"720px"}
                  pb={1} pt={1}
                  pl={1} pr={1}
                  border={"grey 1px solid"}
                  boxShadow={"md"}
                  alignSelf={"center"}
                  rounded={5}
            >
                <AutoSizer className={"list-of-dictionary AutoSizer"}>
                    {({height, width}) => (
                        <ListOfDictionary height={height - 10} width={width} isOpen={isOpen} onOpen={onOpen}/>
                    )}
                </AutoSizer>

            </Grid>
            <DictModal isOpen={isOpen} onClose={onClose} isErase={isErase} setIsErase={setIsErase}/>
        </VStack>

    )
}