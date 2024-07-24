import {
    Box,
    Button, Flex, Text,
} from "@chakra-ui/react";
import {FC, useCallback} from "react";
import {AUTH_LINK, DICTIONARY_LINK, GAME_LINK} from "../../shared/constants-link.ts";
import {useNavigate} from "react-router";
import {useUI, useUser} from "../../shared/store/zustand";
import {Fade} from "react-awesome-reveal";
import {buttonStyles} from "../../shared/ui/button-style.ts";
import {ChangeColor} from "../../components/changeColor";
import {TLanguage} from "../../shared/types/ui-types.ts";

const HomePage: FC = () => {

    const navigate = useNavigate();
    const colorUI = useUI(state => state.colorUI)
    const isAuth = useUser(state => state.isAuth)
    const translations = useUI(state => state.translations)
    const language:TLanguage = useUI(state => state.language)


    const _buttonStyles = {
        ...buttonStyles(colorUI),
        w: '90%',
        m: 1,
        pl: 10,
        pr: 10,
        maxWidth: '400px',
    }
    const handleClick = useCallback((command: string) => {
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
        "Game": translations[language].learn,
        "Dictionary": translations[language].dictionary,
        "Account": isAuth ? translations[language].account : translations[language].regOrLogin,
    }

    return (
        <Fade>
            <Flex
                display={"flex"}
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                w={"100%"}
                h={"100%"}
                paddingY={2}
                p={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}>
                <Box h={"100%"}>

                </Box>
                {Object.entries(buttonList).map(([key, value]) => (
                    <Button
                        key={key}

                        {..._buttonStyles}
                        maxW={"350px"}
                        h={{base: 10, sm: 10, md: 12, lg: 14, xl: 14, "2xl": 16}}
                        rounded={{base: 16, sm: 16, md: 20, lg: 18, xl: 18, "2xl": 20}}
                        minH={"50px"}
                        onClick={() => handleClick(key)}>
                        <Text fontWeight={{
                            base: "bold",
                            sm: "bold",
                            md: "bold",
                            lg: "normal",
                            xl: "normal",
                            "2xl": "normal"
                        }}
                              fontSize={{base: "lg", sm: "lg", md: "lg", lg: "2xl", xl: "2xl", "2xl": "3xl"}}>
                            {value}
                        </Text>
                    </Button>
                ))
                }
                <Flex direction={"column"}
                      h={"100%"}
                      justifyContent={"end"}
                >

                    <ChangeColor/>
                </Flex>
            </Flex>
        </Fade>

    )
}

export default HomePage;