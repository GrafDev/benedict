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
import HeadingFade from "./heading-fade/heading-fade.tsx";
import useUI from "../../shared/hooks/use-ui.tsx";

const AuthSignIn = memo(() => {
    const {isDark,backgroundColor,colorElement, colorUI} = useUI()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorCommon, setError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [rememberMe, setRememberMe] = useState(false);
    const setCurrentUser = useUserStore(state => state.setCurrentUser)

    useEffect(() => {
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
            const {email, password} = JSON.parse(rememberedUser);
            setEmail(email);
            setPassword(password);
            setRememberMe(true);
        }
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
                setError("")

            })
            .catch((error) => {
                console.log(error)
                if (error.code === "auth/user-not-found") {
                    setEmailError("User not found")
                } else if (error.code === "auth/wrong-password") {
                    setPasswordError("Wrong password")
                } else {
                    setError(error.message)
                }
                console.log(errorCommon)
            })


    }


    const switchToSignUp = () => {
        setPasswordError("")
    }

    return (
        <Fade>
            <Box w={["full", "md"]}
                 p={[8, 10]}
                 backgroundColor={isDark ? backgroundColor.dark : backgroundColor.light}
                 mt={[20, "10vh"]}
                 mx={"auto"}
                 border={["none", "1px"]}
                 borderColor={['', colorElement]}
                 rounded={[0, 4, 10, 15]}>

                <VStack spacing={4} align={"flex-start"} w={"full"}>
                    <VStack spacing={1} align={["flex-start", "center"]} w={"full"}>
                     <HeadingFade text1={"Sign In"} text2={"Already have an account?"}/>
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
                            <HStack w={"full"} justifyContent={"space-between"} mb={2}>
                                <Checkbox
                                    colorScheme={colorUI}
                                    isChecked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                >
                                    <Text fontSize={{base: "sm", md: "md", lg: "lg"}}>Remember me</Text>
                                </Checkbox>
                                <Fade>
                                    <Button variant={"link"}
                                            color={isDark && colorUI === 'gray' ? `${colorUI}.400` : colorElement}>Forgot
                                        password?</Button>
                                </Fade>
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
                                    Sign Up"
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