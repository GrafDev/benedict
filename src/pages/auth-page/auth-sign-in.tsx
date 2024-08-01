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
import {memo, useState} from "react";
import {Fade} from "react-awesome-reveal";
import {signInWithEmailAndPassword} from "firebase/auth";
import {authUser} from "../../shared/store/firebase/firebase.ts";
import {IUser} from "../../shared/types/user-types.ts";
import HeadingFade from "../../components/auth/heading-fade/heading-fade.tsx";
import useOptions from "../../shared/hooks/use-options.tsx";
import {
    AUTH_RESET_PASSWORD_ROUTE,
    AUTH_SIGN_UP_ROUTE,
    HOME_ROUTE,
} from "../../shared/constants";
import {useNavigate} from "react-router";

import catchErrorFirebase from "./chatch-error/catch-error.ts";
import makeUser from "../../features/user-features/make-user.ts";
import userPersistence from "../../features/user-features/user-persistence.ts";

const AuthSignIn = memo(() => {
    const {isDark,gTrans, buttonStyle, backgroundColor, colorElement, colorUI} = useOptions()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorCommon, setErrorCommon] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [rememberMe, setRememberMe] = useState(true);
    const setCurrentUser = useUserStore(state => state.setCurrentUser)
    const loadVocabulariesFromServer = useUserStore(state => state.loadVocabulariesFromServer)
    const loadUserRecordFromServer= useUserStore(state => state.loadUserRecordFromServer)
    const navigate = useNavigate();

    const handleConfirm = (event: any) => {
        event.preventDefault()
        console.log("handleConfirm")
        setEmailError("")
        setPasswordError("")
        userPersistence(rememberMe)
        signInWithEmailAndPassword(authUser, email, password)
            .then((userCredential) => {
                // Signed in
                const user: IUser = makeUser(userCredential.user)
                setCurrentUser(user)
                setEmail("")
                setPassword("")
                setErrorCommon("")
                loadUserRecordFromServer()
                loadVocabulariesFromServer()
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
                 p={[4, 8]}
                 backgroundColor={isDark ? backgroundColor.dark : backgroundColor.light}
                 mx={"auto"}
                 border={["none", "1px"]}
                 borderColor={['', colorElement]}
                 rounded={[0, 4, 10, 15]}>

                <VStack spacing={4} align={"flex-start"} w={"full"}>
                    <VStack spacing={1} align={["flex-start", "center"]} w={"full"}>
                        <HeadingFade text1={gTrans("Sign In")} text2={gTrans("Already have an account?")} error={errorCommon}/>
                    </VStack>
                    <Box w={"full"}>
                        <form onSubmit={handleConfirm}>
                            <FormControl isInvalid={!!emailError}>
                                <FormLabel>{gTrans("Email")}</FormLabel>
                                <Input
                                    value={email}
                                    width={"100%"}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={gTrans("Enter your email")}
                                    rounded={["none", "md", "lg"]}
                                    variant={"filled"}
                                    type={"email"}
                                    mb={2}
                                />
                                <FormErrorMessage>{emailError}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!passwordError} mb={4}>
                                <FormLabel>{gTrans("Password")}</FormLabel>
                                <Input
                                    value={password}
                                    id={"password"}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={gTrans("Enter your password")}
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
                                    <Text fontSize={{base: "sm", md: "md", lg: "lg"}}>{gTrans("Remember Me")}</Text>
                                </Checkbox>
                                <Button variant={"link"}
                                        fontSize={["sm"]}
                                        color={isDark && colorUI === 'gray' ? `${colorUI}.400` : colorElement}
                                        onClick={hendleResetPassword}>
                                    {`${gTrans("Forgot password")}?`}
                                </Button>
                            </HStack>
                            <HStack spacing={[4, 8]} mt={6} w={"full"} justifyContent={"start"}>
                                <Button {...buttonStyle}
                                    w={"auto"}

                                        type={"submit"}>
                                    {gTrans("Sign In")}
                                </Button>
                                <Button
                                    variant={"link"}
                                    onClick={switchToSignUp}
                                    color={isDark && colorUI === 'gray' ? `${colorUI}.400` : colorElement}
                                >
                                    {gTrans("Sign Up")}
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