import {
    Button,
    Card,
    useColorModeValue,
    VStack,
    Text, Box, Collapse, useDisclosure,
} from "@chakra-ui/react";
import {FC, useCallback} from "react";
import {AUTH_LINK, DICTIONARY_LINK, GAME_LINK} from "../../shared/constants-ui.ts";
import {useNavigate} from "react-router";
import {useUser} from "../../shared/store/zustand";

export const HomePage: FC = () => {

    const navigate = useNavigate();
    const colorUI = useUser(state => state.currentUser.colorUI)
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const isAuth = useUser(state => state.isAuth)
    const translations = useUser(state => state.translations)
    const language = useUser(state => state.currentUser.language)
    const {isOpen, onToggle} = useDisclosure()

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
    const helpInfo = (
        <>
            <Text>
                {translations[language].help1}
            </Text>
            <Text>
                {translations[language].help2}
            </Text>
            <Text>
                {translations[language].help3}
            </Text>

            <Text textAlign={"center"}
                  mb={4}
            >
            </Text>
        </>
    )


    return (

        <VStack

            display={"flex"}
            justifyContent={"start"}
            w={"100%"}
            h={"100%"}
            p={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}

            fontSize={{base: "lg", sm: "lg", md: "x-large", lg: "x-large", xl: "xx-large", "2xl": "xxx-large"}}>
            <Card
                fontSize={{base: "small", sm: "small", md: "large", lg: "large", xl: "x-large", "2xl": "x-large"}}
                w={"100%"}
                maxW={"720px"}
                p={4}
                mt={"2rem"}
                mb={"2rem"}
            >

                <Box>
                    <Text mb={4}>
                        {translations[language].welcome1}
                        <br/>
                        {translations[language].welcome2}

                    </Text>
                    {!isAuth && <Text mb={4}>
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
                    <Collapse
                        in={isOpen}
                        transition={{exit: {delay: 1}, enter: {duration: 0.5}}}
                    >
                        <Card
                            p={2}
                            colorScheme={colorUI}
                            mt={4}
                            rounded={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "xl", "2xl": "2xl"}}
                            shadow={"lg"}
                        >
                            {helpInfo}
                        </Card>
                    </Collapse>

                </Box>

            </Card>
            {
                Object.entries(buttonList).map(([key, value]) => (
                    <Button
                        key={key}
                        w={'50%'}
                        maxW={"350px"}
                        rounded={100}
                        colorScheme={colorUI}
                        border={isDark ? "1px solid " + colorUI : undefined}
                        boxShadow={'md'}
                        _hover={{
                            boxShadow: 'dark-lg',
                            transform: 'scale(1.01)',
                            border: isDark ? "2px solid " + colorUI : undefined
                        }}
                        onClick={() => handleClick(key)}>
                        {value}
                    </Button>
                ))
            }
        </VStack>
    )
}