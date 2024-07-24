import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Text,
    useColorModeValue,
    VStack,
    FormErrorMessage,
} from "@chakra-ui/react";

import {useUI, useUser} from "../../shared/store/zustand";
import {useEffect, useState} from "react";
import {Fade} from "react-awesome-reveal";
import {buttonStyles} from "../../shared/ui/button-style.ts";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../shared/store/firebase/firebase.ts";
import colorElement from "../../features/common/color-element.ts";

const AuthSignInUp = () => {
    const colorUI = useUI(store => store.colorUI)

    const isDark = useColorModeValue('light', 'dark') === 'dark';
    const setIsAuth = useUser(state => state.setIsAuth)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorCommon, setError] = useState("")
    const backgroundColor = useUI(state => state.backgroundColor)
    const [isSignIn, setIsSignIn] = useState(true)
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
            const { email, password } = JSON.parse(rememberedUser);
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

        if (password !== confirmPassword && !isSignIn) {
            setPasswordError("Passwords do not match")
            return
        }

        if (isSignIn) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user)
                    if (rememberMe) {
                        localStorage.setItem('rememberedUser', JSON.stringify({ email, password }));
                    } else {
                        localStorage.removeItem('rememberedUser');
                    }
                    setEmail("")
                    setPassword("")
                    setError("")
                    setIsAuth(true)
                    console.log("setIsAuth Sign In")

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
                })


        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    console.log(user)
                    setEmail("")
                    setConfirmPassword("")
                    setPassword("")
                    setError("")
                    if (rememberMe) {
                        localStorage.setItem('rememberedUser', JSON.stringify({ email, password }));
                    } else {
                        localStorage.removeItem('rememberedUser');
                    }
                    setIsAuth(true)
                    console.log("setIsAuth Sign Up")
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
    }



    const switchSignUp = () => {
        setIsSignIn(!isSignIn)
        setConfirmPassword("")
        setPasswordError("")
    }

    const HeadingFade = (props: any) => {
        return (
            <Fade>
                <Heading color={isDark && colorUI==='gray' ? `${colorUI}.200` : colorElement(colorUI)}>
                    {props.text1}
                </Heading>
                <Text fontSize={["xs", "sm"]}>
                    {props.text2}
                </Text>
            </Fade>
        )
    }
    return (
        <Fade>
            <Box w={["full", "md"]}
                 p={[8, 10]}
                 backgroundColor={isDark ? backgroundColor.dark : backgroundColor.light}
                 mt={[20, "10vh"]}
                 mx={"auto"}
                 border={["none", "1px"]}
                 borderColor={['', colorElement(colorUI)]}
                 rounded={[0, 4, 10, 15]}>

                <VStack spacing={4} align={"flex-start"} w={"full"}>
                    <VStack spacing={1} align={["flex-start", "center"]} w={"full"}>
                        {!isSignIn
                            ? <HeadingFade text1={"Sign Up"} text2={"Don't have an account?"}/>
                            : <HeadingFade text1={"Sign In"} text2={"Already have an account?"}/>
                        }
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
                            {isSignIn && <FormErrorMessage>{passwordError}</FormErrorMessage>}
                            {!isSignIn && (
                                <Fade>
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
                                </Fade>
                            )}

                        </FormControl>
                        <HStack w={"full"} justifyContent={"space-between"} mb={2}>
                            <Checkbox
                                colorScheme={colorUI}
                                isChecked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            >
                                <Text fontSize={{base: "sm", md: "md", lg: "lg"}}>Remember me</Text>
                            </Checkbox>
                            {isSignIn &&
                              <Fade>
                                <Button variant={"link"} color={colorElement(colorUI)}>Forgot password?</Button>
                              </Fade>}
                        </HStack>
                        <HStack spacing={[4, 8]} mt={6} w={"full"} justifyContent={"start"}>
                            <Button {...buttonStyles(colorUI)} type={"submit"}>
                                {isSignIn ? "Sign In" : "Sign Up"}
                            </Button>
                            <Button
                                variant={"link"}
                                onClick={switchSignUp}
                                color={colorElement(colorUI)}
                            >
                                {isSignIn ? "Sign Up" : "Sign In"}
                            </Button>
                        </HStack>
                    </form>
                    </Box>
                </VStack>
            </Box>
        </Fade>
    )
}
export default AuthSignInUp;