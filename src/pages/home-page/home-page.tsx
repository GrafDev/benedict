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
        "Game": "LEARN",
        "Dictionary": "DICT",
        "Account": isAuth ? "ACCOUNT" : "REGISTER or LOGIN",
    }
    const helpInfo = (
        <>
            <Text>
                N-back game: You will be presented with words on the screen.
                You need to remember the translation of the word,
                which was shown N moves ago,
                and the word that is shown now.
            </Text>
            <Text>
                Active brain function:
                Playing N-back engages different areas of the brain,
                strengthening neural connections and increasing your ability to remember.
            </Text>
            <Text>
                Much more effective than cards:
                Studies have shown that the N-back method is several times more effective
                traditional word learning methods such as flashcards.
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
                        Memorize foreign words much faster with Benedict!
                        Tired of boring flashcards and ineffective language learning methods?

                        Benedict is a revolutionary app that uses the N-back gaming technique to make
                        learning words in the most effective and enjoyable way.
                    </Text>
                    {!isAuth && <Text mb={4}>
                        <em>If you register, you can add your own dictionary for study and change the color
                            scheme</em>
                    </Text>}
                    <Text textAlign={"center"}
                          mb={4}
                    >
                        <Button textDecoration="underline"
                                onClick={() => onToggle()}>How does Benedict work?</Button>
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