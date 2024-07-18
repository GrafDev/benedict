import {
    Button,
    Card,
    VStack, Image, Text,
    Box, useDisclosure,
} from "@chakra-ui/react";
import React, {FC, useCallback} from "react";
import {AUTH_LINK, DICTIONARY_LINK, GAME_LINK} from "../../shared/constants-link.ts";
import {useNavigate} from "react-router";
import {useUser} from "../../shared/store/zustand";
import {HELP_ANIME} from "../../shared/store/constants-store";
import {isPrintableKey} from "../../features/common";
import {Fade} from "react-awesome-reveal";
import {buttonStyles} from "../../shared/ui/button-style.ts";

const HomePage: FC = () => {

    const navigate = useNavigate();
    const colorUI = useUser(state => state.currentUser.colorUI)
    const isAuth = useUser(state => state.isAuth)
    const translations = useUser(state => state.translations)
    const language = useUser(state => state.currentUser.language)
    const {isOpen, onClose, onToggle} = useDisclosure()


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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (isPrintableKey(event.key)) {
            onClose();
        }

        if (event.key === "ESC") {
            onClose();
        }
    };

    const buttonList: { [key: string]: string } = {
        "Game": translations[language].learn,
        "Dictionary": translations[language].dictionary,
        "Account": isAuth ? translations[language].account : translations[language].regOrLogin,
    }
    const helpInfo = (
        <Image
            boxSize={"80%"}
            onClick={() => onClose()}
            cursor={"pointer"}
            margin={"auto"}
            src={HELP_ANIME}
            alt="Not internet connection..."/>
    )
    return (
        <Fade>
                <VStack
                    display={"flex"}
                    justifyContent={"start"}
                    w={"100%"}
                    h={"100%"}
                    p={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
                    onKeyUp={(e) => handleKeyDown(e)}
                    fontSize={{base: "sm", sm: "md", md: "md", lg: "md", xl: "lg", "2xl": "lg"}}>
                    <Card
                        fontSize={{base: "small", sm: "small", md: "md", lg: "md", xl: "lg", "2xl": "lg"}}
                        w={"90%"}
                        maxW={"1024px"}
                        p={4}
                        mt={"2rem"}
                        mb={"2rem"}
                    >
                        <Box>
                            {!isOpen && <Text mb={4}>
                                {translations[language].welcome1}
                              <br/>
                                {translations[language].welcome2}

                            </Text>}
                            {!isAuth && !isOpen && <Text mb={4}>
                              <em>
                                  {translations[language].registerPlease}
                              </em>
                            </Text>}
                            <Text textAlign={"center"}
                                  mb={4}
                            >
                                <Button textDecoration="underline"
                                        onClick={() => onToggle()}>{translations[language].help}</Button>
                            </Text>

                            {isOpen && <Card
                              p={2}
                              colorScheme={colorUI}
                              mt={4}
                              rounded={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "xl", "2xl": "2xl"}}
                              shadow={"lg"}
                            >
                                {helpInfo}
                            </Card>}
                        </Box>
                    </Card>
                    {
                        Object.entries(buttonList).map(([key, value]) => (
                            <Button
                                key={key}

                                {..._buttonStyles}
                                maxW={"350px"}
                                onClick={() => handleClick(key)}>
                                {value}
                            </Button>
                        ))
                    }
                </VStack>
        </Fade>

    )
}

export default HomePage;