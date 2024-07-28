import {
    Box,
    Button, Flex, Text,
} from "@chakra-ui/react";
import {FC, useCallback, useEffect} from "react";
import {VOCABULARY_ROUTE, GAME_ROUTE, AUTH_DETAILS_ROUTE} from "../../shared/constants";
import {useNavigate} from "react-router";
import {Fade} from "react-awesome-reveal";
import {ChangeColor} from "../../components/changeColor";
import useAuth from "../../shared/hooks/use-auth.tsx";
import useOptions from "../../shared/hooks/use-options.tsx";
import {useUserStore} from "../../shared/store/zustand";
import {useLocation} from "react-router-dom";

const HomePage: FC = () => {

    const navigate = useNavigate();
    const {translations, language, buttonStyle} = useOptions()
    const {isAuth} = useAuth()
    const saveVocabulariesToServer=useUserStore(store => store.saveVocabulariesToServer)
    const location = useLocation();

    useEffect(() => {
        // Эта функция будет вызываться каждый раз, когда меняется location
        saveVocabulariesToServer()
    }, [location.pathname]);

    const _buttonStyles = {
        ...buttonStyle,
        w: '90%',
        m: 1,
        pl: 10,
        pr: 10,
        maxWidth: '400px',
    }
    const handleClick = useCallback((command: string) => {
        switch (command) {
            case "Game":
                navigate(GAME_ROUTE)
                break;
            case "Dictionary":
                navigate(VOCABULARY_ROUTE)
                break;
            case "Account":
                navigate(AUTH_DETAILS_ROUTE)
                break;
            default:
                break;
        }
    }, []);


    const buttonList: { [key: string]: string } = {
        "Game": translations[language].learn,
        "Dictionary": translations[language].dictionary,
        "Account": isAuth ? "Account" : "Log In",
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