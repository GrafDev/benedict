import {
    Box,
    Button, Flex, Grid, GridItem,
    useColorModeValue, useDisclosure,
    VStack
} from "@chakra-ui/react";
import {ListOfDictionary} from "../../widgets/list-of-dictionary";
import AutoSizer from "react-virtualized-auto-sizer";
import {DictModal} from "../../widgets/dict-modal";
import {useDict, useDictModal, useUI} from "../../shared/store/zustand";
import {useCallback, useEffect} from "react";
import {emptyWord} from "../../shared/store/constants-store";

export const DictionariesPage = () => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const backgroundColor: { light: string, dark: string } = useUI(store => store.backgroundColor)
    const setEditWord = useDictModal(store => store.setEditWord)
    const currentDict = useDict(store => store.currentDict)
    const {isOpen, onOpen, onClose} = useDisclosure()


    const handleMenuItemClick = useCallback((command: string) => {
        console.log(`Вы выбрали команду: ${command}`);
        switch (command) {
            case "addWord":
                setEditWord(emptyWord, -1)
                onOpen()
                break;
            case "change Dictionary":
                console.log("change Dictionary")
                break;
            default:
                break;
        }
    }, []);

    useEffect(() => {
        console.log("currentDict", currentDict)
    }, [currentDict]);

    const buttonList: { [key: string]: string } = {
        "addWord": "Add word",
        "change Dictionary": "Change Dictionary",
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
            <Flex alignItems={"center"}
                  justifyItems={"center"}
                  alignSelf={"center"}
                  justifyContent={"space-around"}
                  flexDirection={"row"}
                  flexWrap={"wrap"}
                  w={"70%"}
                  maxW={"512px"}
            >
                {Object.entries(buttonList).map(([key, value]) => (

                    <GridItem as={Button}
                              key={key}
                              w={'90%'}
                              maxW={"200px"}
                              rounded={100}
                              m={2}
                              pl={10}
                              pr={10}
                              background={isDark ? backgroundColor.dark : backgroundColor.light}
                              border={isDark ? '1px solid #F7FAFC' : '1px solid #1A202C'}
                              boxShadow={"md"}
                              onClick={() => handleMenuItemClick(key)}
                              _hover={{
                                  background: isDark ? 'gray.800' : 'gray.300',
                                  transform: 'scale(1.1)',
                              }}>
                        {value}
                    </GridItem>
                ))}
            </Flex>
            <Grid className={"list-of-dictionary BOX-Before AutoSizer"}
                  templateRows={"auto 1fr auto"}
                  h={"100%"}
                  w={"97%"}
                  maxW={"512px"}

                  pl={1} pr={1}
                  boxShadow={"md"}
                  alignSelf={"center"}
                  background={isDark ? 'rgba(10, 10, 10, 0.6)' : 'rgba(250, 250, 250, 0.8)'}
                  rounded={5}
            >
                <AutoSizer className={"list-of-dictionary AutoSizer"}>
                    {({height, width}) => (
                        <ListOfDictionary height={height-10} width={width} isOpen={isOpen} onOpen={onOpen}/>
                    )}
                </AutoSizer>
                <Box zIndex={1} h={"50px"} background={isDark
                    ? 'linear-gradient(rgba(10, 10, 10, 1.0),  rgba(10, 10, 10,0.0))'
                    : 'linear-gradient(rgba(250, 250, 250, 1.0), rgba(250, 250, 250, 0.0))'}/>

                <Box zIndex={1} h={"50px"} background={isDark
                    ? 'linear-gradient(rgba(0, 0, 0, 0.00), rgba(0, 0, 0, 1.0))'
                    : 'linear-gradient(rgba(250, 250, 250, 0.00), rgba(250, 250, 250, 1.0))'}/>
            </Grid>
            <DictModal isOpen={isOpen} onClose={onClose}/>
        </VStack>

    )
}