import {Button, useColorModeValue, VStack} from "@chakra-ui/react";
import {useCallback} from "react";
import {AUTH_LINK, DICTIONARY_LINK, GAME_LINK} from "../../shared/constants.ts";
import {useNavigate} from "react-router";

export const HomePage = () => {

    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const navigate = useNavigate();

    const handleMenuItemClick = useCallback((command: string) => {
        console.log(`Вы выбрали команду: ${command}`);
        switch (command) {
            case "Game":
                navigate(GAME_LINK)
                break;
            case "Dictionary":
                navigate(DICTIONARY_LINK)
                break;
            case "Account":
                navigate(AUTH_LINK)
                break;
            default:
                break;
        }
    }, []);

    return (
        <VStack
            display={"flex"}
            justifySelf={"center"}
            justifyContent={"center"}
            w={"90%"}
            h={"fit-content"}
            maxW={"720px"}
            m={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
            p={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
            rounded={"xl"}
            background={isDark ? 'rgba(10, 10, 10, 0.4)' : 'rgba(250, 250, 250, 0.4)'}
            border={isDark ? '1px solid #A0AEC0' : '1px solid #718096'}
            fontSize={{base: "lg", sm: "lg", md: "x-large", lg: "x-large", xl: "xx-large", "2xl": "xxx-large"}}>

            <Button
                w={'80%'}
                maxW={"720px"}
                rounded={100}
                background={isDark ? 'gray.700' : 'gray.200'}
                boxShadow={"md"}
                _hover={{
                    background: isDark ? 'gray.800' : 'gray.300',
                    transform: 'scale(1.02)',
                }}
                onClick={() => handleMenuItemClick("Game")}>
                LEARN
            </Button>
            <Button
                w={'80%'}
                maxW={"720px"}
                rounded={100}
                background={isDark ? 'gray.700' : 'gray.200'}
                boxShadow={"md"}
                _hover={{
                    background: isDark ? 'gray.800' : 'gray.300',
                    transform: 'scale(1.02)',
                }}
                onClick={() => handleMenuItemClick("Dictionary")}>
                Dictionary
            </Button>
            <Button
                w={'80%'}
                maxW={"720px"}
                rounded={100}
                background={isDark ? 'gray.700' : 'gray.200'}
                boxShadow={"md"}
                _hover={{
                    background: isDark ? 'gray.800' : 'gray.300',
                    transform: 'scale(1.02)',
                }}
                onClick={() => handleMenuItemClick("Account")}>
                Account
            </Button>

        </VStack>
    )
}