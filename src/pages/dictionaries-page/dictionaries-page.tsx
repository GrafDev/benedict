import {
    Button, Flex, Grid, GridItem,
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
    const currentDict = useUser(store => store.currentDict)
    const setCurrentDict = useUser(store => store.setCurrentDict)
    const setIsUserDict = useUser(store => store.setIsUserDictionary)
    const isUserDict = useUser(store => store.currentUser.isUserDictionary)
    const colorUI = useUser(store => store.currentUser.colorUI)
    const isAuth = useUser(store => store.isAuth)
    const isUserDictionary = useUser(store => store.currentUser.isUserDictionary)
    const translations = useUser(store => store.translations)
    const language = useUser(store => store.currentUser.language)
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
                setCurrentDict()
                break;
            case "clear Dictionary":
                setIsErase(true)
                onOpen()
                break;
            default:
                break;

        }
    }, []);


    const buttonList: { [key: string]: string } = {
        "addWord": translations[language].addWord,
        "clear Dictionary": translations[language].clearDictionary,
        "change Dictionary": translations[language].changeDictionary,
    }
    return (

        <VStack
            display={"flex"}
            justifySelf={"start"}
            justifyContent={"start"}
            alignItems={"left"}
            w={"100%"}
            h={"100%"}
            p={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
            fontSize={{base: "lg", sm: "lg", md: "x-large", lg: "x-large", xl: "xx-large", "2xl": "xxx-large"}}
        >
            {isAuth && <Flex alignItems={"center"}
                              justifyItems={"center"}
                              alignSelf={"center"}
                              justifyContent={"space-around"}
                              flexDirection={"row"}
                              flexWrap={"wrap"}
                              w={"70%"}
                              maxW={"512px"}
            >
                {Object.entries(buttonList).map(([key, value]) => (
                    (!isUserDict && key === "clear Dictionary") ||
                    <GridItem as={Button}
                              key={key}
                              maxW={"250px"}
                              rounded={100}
                              m={2}
                              border={isDark ? "1px solid " + colorUI : undefined}
                              colorScheme={colorUI}
                              isDisabled={(isUserDict && currentDict.length === 0
                                  && key === "clear Dictionary") || (key === "addWord" && !isUserDictionary)}
                              pl={10}
                              pr={10}
                              boxShadow={"md"}
                              onClick={() => handleMenuItemClick(key)}
                              _hover={{
                                  boxShadow: 'dark-lg',
                                  transform: 'scale(1.01)',
                                  border: isDark ? "2px solid " + colorUI : undefined
                              }}>
                        {value}
                    </GridItem>
                ))}
            </Flex>}
            <Grid className={"list-of-dictionary BOX-Before AutoSizer"}
                  templateRows={"auto 1fr auto"}
                  h={"100%"}
                  w={"97%"}
                  maxW={"512px"}
                  pb={1} pt={1}
                  pl={1} pr={1}
                  border={"grey 1px solid"}
                  boxShadow={"md"}
                  alignSelf={"center"}
                // background={isDark ? 'rgba(10, 10, 10, 0.6)' : 'rgba(250, 250, 250, 0.8)'}
                  rounded={5}
            >
                <AutoSizer className={"list-of-dictionary AutoSizer"}>
                    {({height, width}) => (
                        <ListOfDictionary height={height - 10} width={width} isOpen={isOpen} onOpen={onOpen}/>
                    )}
                </AutoSizer>
                {/*<Box zIndex={1} h={"100px"} pointerEvents={"none"}*/}
                {/*     background={isDark*/}
                {/*         ? 'linear-gradient(rgba(10, 10, 10, 1.0),  rgba(10, 10, 10,0.0))'*/}
                {/*         : 'linear-gradient(rgba(250, 250, 250, 1.0), rgba(250, 250, 250, 0.0))'}/>*/}

                {/*<Box zIndex={1} h={"100px"} pointerEvents={"none"}*/}
                {/*     background={isDark*/}
                {/*         ? 'linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 1.0))'*/}
                {/*         : 'linear-gradient(rgba(250, 250, 255, 0.0), rgba(250, 250, 250, 1.0))'}/>*/}
            </Grid>
            <DictModal isOpen={isOpen} onClose={onClose} isErase={isErase} setIsErase={setIsErase}/>
        </VStack>

    )
}