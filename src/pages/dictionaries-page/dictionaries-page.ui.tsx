import {
    Box,
    Button,
    useColorModeValue, useDisclosure,
    VStack
} from "@chakra-ui/react";
import {ListOfDictionary} from "../../widgets/list-of-dictionary";
import AutoSizer from "react-virtualized-auto-sizer";
import {DictModal} from "../../widgets/dict-modal";
import {useUI} from "../../shared/store/zustand";

export const DictionariesPage = () => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const backgroundColor: { light: string, dark: string } = useUI(store => store.backgroundColor)
    const {isOpen,onOpen, onClose}=useDisclosure()
    // const handleMenuItemClick = useCallback((command: string) => {
    //     console.log(`Вы выбрали команду: ${command}`);
    //     switch (command) {
    //         case "addWord":
    //             console.log("Modal Windows")
    //
    //             break;
    //         default:
    //             break;
    //     }
    // }, []);

    const buttonList: { [key: string]: string } = {
        "addWord": "Add word",
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
            fontSize={{base: "lg", sm: "lg", md: "x-large", lg: "x-large", xl: "xx-large", "2xl": "xxx-large"}}>
            {Object.entries(buttonList).map(([key, value]) => (
                <Button
                    key={key}
                    w={'50%'}
                    maxW={"350px"}
                    rounded={100}
                    m={2}
                    alignSelf={"center"}
                    background={isDark ? backgroundColor.dark : backgroundColor.light}
                    border={isDark ? '1px solid #F7FAFC' : '1px solid #1A202C'}
                    boxShadow={"md"}
                    _hover={{
                        background: isDark ? 'gray.800' : 'gray.300',
                        transform: 'scale(1.1)',
                    }}>
                    {value}
                </Button>
            ))}
            <Box className={"list-of-dictionary BOX-Before AutoSizer"}
                 h={"100%"}
                 w={"97%"}
                 maxW={"720px"}
                 pt={2} pb={2}
                 pl={2} pr={2}
                // border={isDark ? '1px solid #F7FAFC' : '1px solid #1A202C'}
                 boxShadow={"md"}
                 alignSelf={"center"}
                 background={isDark ? 'rgba(10, 10, 10, 0.6)' : 'rgba(250, 250, 250, 0.8)'}
                 rounded={5}>
                <AutoSizer className={"list-of-dictionary AutoSizer"}>
                    {({height, width}) => (
                        <ListOfDictionary height={height} width={width} isOpen={isOpen} onOpen={onOpen} />
                    )}
                </AutoSizer>
            </Box>
            <DictModal isOpen={isOpen} onClose={onClose}/>
        </VStack>

    )
}