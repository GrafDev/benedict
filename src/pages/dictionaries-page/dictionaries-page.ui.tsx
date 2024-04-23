import {Button, useColorModeValue, VStack} from "@chakra-ui/react";
import {useUI} from "../../shared/store/zustand/store.ts";
import {useCallback} from "react";
import {ListOfDictionary} from "../../widgets/list-of-dictionary";

export const DictionariesPage = () => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const backgroundColor: { light: string, dark: string } = useUI(store=>store.backgroundColor)

    const handleMenuItemClick = useCallback((command: string) => {
        console.log(`Вы выбрали команду: ${command}`);
        switch (command) {
            case "addWord":
                console.log("Modal Windows")
                break;
            default:
                break;
        }
    }, []);

    const buttonList: { [key: string]: string } = {
        "addWord": "Add word",
    }
    return (
        <VStack
            display={"flex"}
            justifySelf={"start"}
            justifyContent={"start"}
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
                    background={isDark ? backgroundColor.dark : backgroundColor.light}
                    border={isDark ? '1px solid #F7FAFC' : '1px solid #1A202C'}
                    boxShadow={"md"}
                    _hover={{
                        background: isDark ? 'gray.800' : 'gray.300',
                        transform: 'scale(1.02)',
                    }}
                    onClick={() => handleMenuItemClick(key)}>
                    {value}
                </Button>
            ))}
            <ListOfDictionary/>
        </VStack>
    )
}