import {Button, VStack} from "@chakra-ui/react";
import {FC, useCallback} from "react";
import {AUTH_LINK, DICTIONARY_LINK, GAME_LINK} from "../../shared/constants-ui.ts";
import {useNavigate} from "react-router";
import {useUser} from "../../shared/store/zustand";

export const HomePage: FC = () => {

    const navigate = useNavigate();
    const colorUI = useUser(state => state.currentUser.colorUI)

    const handleMenuItemClick = useCallback((command: string) => {
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

    const buttonList: { [key: string]: string } = {
        "Game": "LEARN",
        "Dictionary": "DICT",
        "Account": "ACCOUNT",
    }
    return (
        <VStack
            display={"flex"}
            justifySelf={"center"}
            justifyContent={"center"}
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
                    colorScheme={colorUI}
                    boxShadow={"lg"}
                    _hover={{
                        shadow: 'dark-lg',
                        transform: 'scale(1.01)',
                    }}
                    onClick={() => handleMenuItemClick(key)}>
                    {value}
                </Button>
            ))
            }
        </VStack>
    )
}