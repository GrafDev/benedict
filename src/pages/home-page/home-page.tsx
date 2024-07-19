import {
    Button,
    VStack
} from "@chakra-ui/react";
import  {FC, useCallback} from "react";
import {AUTH_LINK, DICTIONARY_LINK, GAME_LINK} from "../../shared/constants-link.ts";
import {useNavigate} from "react-router";
import {useUser} from "../../shared/store/zustand";
import {Fade} from "react-awesome-reveal";
import {buttonStyles} from "../../shared/ui/button-style.ts";

const HomePage: FC = () => {

    const navigate = useNavigate();
    const colorUI = useUser(state => state.currentUser.colorUI)
    const isAuth = useUser(state => state.isAuth)
    const translations = useUser(state => state.translations)
    const language = useUser(state => state.currentUser.language)


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
                <VStack
                    display={"flex"}
                    justifyContent={"start"}
                    w={"100%"}
                    h={"100%"}
                    p={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
                    fontSize={{base: "sm", sm: "md", md: "md", lg: "md", xl: "lg", "2xl": "lg"}}>
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