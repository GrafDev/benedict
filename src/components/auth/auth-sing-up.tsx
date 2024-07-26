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
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../shared/store/firebase/firebase.ts";
import {IUser} from "../../shared/types/user-types.ts";
import HeadingFade from "./heading-fade/heading-fade.tsx";
import useUI from "../../shared/hooks/use-ui.tsx";

const AuthSignUp = memo(() => {
    const {isDark,backgroundColor, colorElement, colorUI} = useUI()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
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

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match")
            return
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((recivedUser) => {
                setEmail("")
                setConfirmPassword("")
                setPassword("")
                setError("")
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', JSON.stringify({email, password}));
                } else {
                    localStorage.removeItem('rememberedUser');
                }
                const _user: IUser = {
                    id: recivedUser.user.uid,
                    email: recivedUser.user.email,
                    username: recivedUser.user.displayName,
                    photoUrl: recivedUser.user.photoURL,
                    token: recivedUser.user.refreshToken,
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
                }
                setCurrentUser(_user)

                console.log("setIsAuth Sign Up", _user) // TODO: remove console
            })
            .catch((error) => {
                console.log(error)
                if (error.code === "auth/email-already-in-use") {
                    setEmailError("Email is already in use")
                } else if (error.code === "auth/invalid-email") {
                    setEmailError("Invalid email address")
                } else if (error.code === "auth/weak-password") {
                    setPasswordError("Password is too weak")
                } else {
                    setError(error.message)
                    console.log(errorCommon)
                }
            })
    }


    const switchToSignIn = () => {
        setConfirmPassword("")
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
                        <HeadingFade text1={"Sign Up"} text2={"Don't have an account?"}/>
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
                                <Input
                                    value={confirmPassword}
                                    id={"confirmPassword"}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder={"Confirm your password"}
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
                            </HStack>
                            <HStack spacing={[4, 8]} mt={6} w={"full"} justifyContent={"start"}>
                                <Button {...buttonStyles(colorUI)} type={"submit"}>
                                    Sign Up
                                </Button>
                                <Button
                                    variant={"link"}
                                    onClick={switchToSignIn}
                                    color={isDark && colorUI === 'gray' ? `${colorUI}.400` : colorElement}
                                >
                                    Sign In
                                </Button>
                            </HStack>
                        </form>
                    </Box>
                </VStack>
            </Box>
        </Fade>
    )
})

export default AuthSignUp;