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
import {createUserWithEmailAndPassword} from "firebase/auth";
import {authUser} from "../../shared/store/firebase/firebase.ts";
import {IUser} from "../../shared/types/user-types.ts";
import HeadingFade from "../../components/auth/heading-fade/heading-fade.tsx";
import useOptions from "../../shared/hooks/use-options.tsx";
import {useNavigate} from "react-router";
import {AUTH_SIGN_IN_ROUTE, HOME_ROUTE} from "../../shared/constants";
import catchErrorFirebase from "./chatch-error/catch-error.ts";
import makeUser from "../../features/user-features/make-user.ts";
import userPersistence from "../../features/user-features/user-persistence.ts";

const AuthSignUp = memo(() => {
    const {isDark, backgroundColor, colorElement,buttonStyle, colorUI} = useOptions()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorCommon, setErrorCommon] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [rememberMe, setRememberMe] = useState(false);
    const setCurrentUser = useUserStore(state => state.setCurrentUser)
    const loadVocabulariesFromServer = useUserStore(state => state.loadVocabulariesFromServer)
    const navigate = useNavigate();

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
        if (email === "") {
            setEmailError("Email is required")
            return
        }
        if (password === "") {
            setPasswordError("Password is required")
            return
        }
        if (password === "") {
            setPasswordError("Password is required")
            return
        }
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match")
            return
        }
        userPersistence(rememberMe)

        createUserWithEmailAndPassword(authUser, email, password)
            .then((userCredential) => {

                const _user: IUser = makeUser(userCredential.user)
                setCurrentUser(_user)
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                setPassword("")
                setErrorCommon("")
                loadVocabulariesFromServer()
                navigate(HOME_ROUTE)
            })
            .catch((error) => {
                console.log("CATCH")
                catchErrorFirebase(error, setErrorCommon, setEmailError, setPasswordError)
            })
    }
    const switchToSignIn = () => {
        setConfirmPassword("")
        setPasswordError("")
        navigate(AUTH_SIGN_IN_ROUTE)
    }
    return (
        <Fade>
            <Box w={["full", "auto"]}
                 p={[4, 8]}
                 backgroundColor={isDark ? backgroundColor.dark : backgroundColor.light}
                 mx={"auto"}
                 border={["none", "1px"]}
                 borderColor={['', colorElement]}
                 rounded={[0, 4, 10, 15]}>

                <VStack spacing={4} align={"flex-start"} w={"full"}>
                    <VStack spacing={1} align={["flex-start", "center"]} w={"full"}>
                        <HeadingFade text1={"Sign Up"} text2={"Don't have an account?"} error={errorCommon}/>
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
                                <Button {...buttonStyle} type={"submit"}>
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