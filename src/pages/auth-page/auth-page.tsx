import {useUI, useUser} from "../../shared/store/zustand";
import {useCallback, useEffect, useState} from "react";
import {
    Text,
    Button,
    useDisclosure,
    VStack,
    Flex,
    Card,
    CardHeader, Avatar, Heading, Box, IconButton, CardBody, useColorModeValue
} from "@chakra-ui/react";
import {IUser, TUserOptions} from "../../shared/types.ts";
import {UserModal} from "./user-modal";
import {IoExitOutline} from "react-icons/io5";
import {ChangeColor} from "../../widgets/header/changeColor";
import {useNavigate} from "react-router";
import {DICTIONARY_LINK} from "../../shared/constants-link.ts";
import {Fade} from "react-awesome-reveal";
import {buttonStyles} from "../../shared/ui/button-style.ts";


const AuthPage = () => {
    const isAuth: boolean = useUser((state) => state.isAuth);
    const currentUser: IUser | undefined = useUser((state) => state.currentUser);
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [userOptions, setUserOptions] = useState<TUserOptions>("SignUp")
    const [user, setUser] = useState<IUser | undefined>(currentUser)

    const colorUI = useUser(store => store.currentUser.colorUI)
    const navigate = useNavigate()
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const translations = useUser(state => state.translations)
    const language = useUser(state => state.currentUser.language)
    const mainColor = useUI(store => store.mainColor)


    useEffect(() => {
        setUser(currentUser)
    }, [currentUser]);


    const handleMenuItemClick = useCallback((command: string) => {
        switch (command) {
            case "SignIn":
                setUserOptions("SignIn")
                onOpen()
                break;
            case "SignUp":
                setUserOptions("SignUp")
                onOpen()
                break;
            case "Edit":
                navigate(DICTIONARY_LINK)
                break;
            case "Exit":
                setUserOptions("Exit")
                onOpen()
                break;
            default:
                break;
        }
    }, []);

    return (
        <Fade>

            <VStack
                display={"flex"}
                justifySelf={"start"}
                alignItems={"center"}
                w={"100%"}
                h={"100%"}
                mt={6}
                p={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
                fontSize={{base: "lg", sm: "lg", md: "large", lg: "large", xl: "x-large", "2xl": "xx-large"}}
            >

                <Card maxW='md' background={isDark ? mainColor.dark : mainColor.light}>
                    <CardHeader>
                        <Flex gap='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar name={user ? user.username : "Guest"}
                                        background={`${colorUI}.200`}
                                    // background={isDark ? backgroundColor.dark : backgroundColor.light}
                                    // color={isDark ? backgroundColor.light : backgroundColor.dark}
                                />
                                <Box>
                                    <Heading
                                        size='sm'>{user ? user.username : translations[language].regOrLogin}</Heading>
                                </Box>
                            </Flex>
                            {isAuth && <IconButton
                              variant='ghost'
                              colorScheme={colorUI}
                              aria-label='See menu'
                              size={"20px"}
                              icon={<IoExitOutline/>}
                              _hover={{
                                  color: `${colorUI}.800`,
                              }}
                              onClick={() => handleMenuItemClick("Exit")}
                            />}
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <ChangeColor/>
                        <Text mb={2} fontSize={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "xl", "2xl": "2xl"}}>
                            {!isAuth && translations[language].registerPlease}

                        </Text>
                        {isAuth &&
                          <Flex direction={"column"}
                                justifyContent={"start"}
                                alignItems={"center"}>
                            <Button
                                {...buttonStyles(colorUI)}
                                onClick={() => handleMenuItemClick("Edit")}>
                                {translations[language].dictionary}
                            </Button>
                          </Flex>}

                    </CardBody>

                </Card>
                <Flex h={"100%"}
                      direction={"column"}
                      justifyContent={"start"}>
                    <VStack>
                        {!isAuth && <Button
                            {...buttonStyles(colorUI)}
                            onClick={() => handleMenuItemClick("SignIn")}>
                            {translations[language].signIn}
                        </Button>}
                        {!isAuth && <Button
                            {...buttonStyles(colorUI)}
                            onClick={() => handleMenuItemClick("SignUp")}>
                            {translations[language].signUp}
                        </Button>}
                    </VStack>
                </Flex>

                <UserModal isOpen={isOpen} onClose={onClose} userOptions={userOptions}/>
            </VStack>
        </Fade>

    )
}

export default AuthPage;