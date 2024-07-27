import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Text,
    VStack,
    FormErrorMessage,
} from "@chakra-ui/react";

import {useUserStore} from "../../shared/store/zustand";
import {memo, useEffect, useState} from "react";
import {Fade} from "react-awesome-reveal";
import {buttonStyles} from "../../shared/ui/button-style.ts";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../shared/store/firebase/firebase.ts";
import {IUser} from "../../shared/types/user-types.ts";
import HeadingFade from "../../components/auth/heading-fade/heading-fade.tsx";
import useUI from "../../shared/hooks/use-ui.tsx";
import {
    AUTH_RESET_PASSWORD_ROUTE,
    AUTH_SIGN_UP_ROUTE,
    HOME_ROUTE,
} from "../../shared/constants";
import {useNavigate} from "react-router";

import catchErrorFirebase from "./chatch-error/catch-error.ts";

const AuthSignIn = memo(() => {
    const {isDark, backgroundColor, colorElement, colorUI} = useUI()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorCommon, setErrorCommon] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [rememberMe, setRememberMe] = useState(false);
    const setCurrentUser = useUserStore(state => state.setCurrentUser)
    const navigate = useNavigate();



    useEffect(() => {
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
            const {email, password} = JSON.parse(rememberedUser);
            setEmail(email);
            setPassword(password);
            setRememberMe(true);
        }
        console.log("useEffect", localStorage.getItem('rememberedUser'))
    }, []);


    const handleConfirm = (event: any) => {
        event.preventDefault()
        console.log("handleConfirm")
        setEmailError("")
        setPasswordError("")

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user: IUser = {
                    id: userCredential.user.uid,
                    email: userCredential.user.email,
                    username: userCredential.user.displayName,
                    photoUrl: userCredential.user.photoURL,
                    token: userCredential.user.refreshToken,
                    options: {
                        isBG: false,
                        isDarkTheme: true,
                        colorUI: 'gray',
                        userRecord: 0,
                        language: 'en',
                    },
                    data: {
                        currentVocabularyId: '0',
                        userVocabularies: [],
                    }
                };
                setCurrentUser(user)

                console.log(user) // TODO: remove console
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', JSON.stringify({email, password}));
                } else {
                    localStorage.removeItem('rememberedUser');
                }
                setEmail("")
                setPassword("")
                setErrorCommon("")
                navigate(HOME_ROUTE)
            })
            .catch((error) => {
                console.log("CATCH")
                catchErrorFirebase(error, setErrorCommon, setEmailError, setPasswordError)
            })


    }
    const hendleResetPassword = () => {
        navigate(AUTH_RESET_PASSWORD_ROUTE)
    }

    const switchToSignUp = () => {
        setPasswordError("")
        setEmailError("")
        setEmail("")
        navigate(AUTH_SIGN_UP_ROUTE)
    }

    return (
        <Fade>
            <Box w={["full", "auto"]}
                 p={[8, 10]}
                 backgroundColor={isDark ? backgroundColor.dark : backgroundColor.light}
                 mt={[20, "10vh"]}
                 mx={"auto"}
                 border={["none", "1px"]}
                 borderColor={['', colorElement]}
                 rounded={[0, 4, 10, 15]}>

                <VStack spacing={4} align={"flex-start"} w={"full"}>
                    <VStack spacing={1} align={["flex-start", "center"]} w={"full"}>
                        <HeadingFade text1={"Sign In"} text2={"Already have an account?"} error={errorCommon}/>
                    </VStack>
                    <Box w={"full"}>
                        <form onSubmit={handleConfirm}>
                            <FormControl isInvalid={!!emailError}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    value={email}
                                    width={"100%"}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={"Enter your email"}
                                    rounded={["none", "md", "lg"]}
                                    variant={"filled"}
                                    type={"email"}
                                    mb={2}
                                />
                                <FormErrorMessage>{emailError}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!passwordError} mb={4}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    value={password}
                                    id={"password"}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={"Enter your password"}
                                    rounded={["none", "md", "lg"]}
                                    variant={"filled"}
                                    type={"password"}
                                    mb={1}
                                />
                                <FormErrorMessage>{passwordError}</FormErrorMessage>
                            </FormControl>
                            <HStack w={"full"} spacing={[8, 12]} justifyContent={"space-between"} mb={2}>
                                <Checkbox
                                    colorScheme={colorUI}
                                    isChecked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                >
                                    <Text fontSize={{base: "sm", md: "md", lg: "lg"}}>Remember me</Text>
                                </Checkbox>
                                <Button variant={"link"}
                                        fontSize={["sm"]}
                                        color={isDark && colorUI === 'gray' ? `${colorUI}.400` : colorElement}
                                        onClick={hendleResetPassword}>
                                    Forgot password?
                                </Button>
                            </HStack>
                            <HStack spacing={[4, 8]} mt={6} w={"full"} justifyContent={"start"}>
                                <Button {...buttonStyles(colorUI)} type={"submit"}>
                                    Sign In
                                </Button>
                                <Button
                                    variant={"link"}
                                    onClick={switchToSignUp}
                                    color={isDark && colorUI === 'gray' ? `${colorUI}.400` : colorElement}
                                >
                                    Sign Up
                                </Button>
                            </HStack>
                        </form>
                    </Box>
                </VStack>
            </Box>
        </Fade>
    )
})

export default AuthSignIn;