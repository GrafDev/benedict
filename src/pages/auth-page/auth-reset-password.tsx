import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    FormErrorMessage, Flex,
} from "@chakra-ui/react";

import {memo, useState} from "react";
import {Fade} from "react-awesome-reveal";
import useOptions from "../../shared/hooks/use-options.tsx";
import {useNavigate} from "react-router";
import {AUTH_SIGN_IN_ROUTE} from "../../shared/constants";
import HeadingFade from "../../components/auth/heading-fade/heading-fade.tsx";
import {authUser} from "../../shared/store/firebase/firebase.ts";
import {sendPasswordResetEmail} from "firebase/auth";

const AuthResetPassword = memo(() => {

    const {colorElement, backgroundColor, buttonStyle, isDark} = useOptions()
    const [emailError, setEmailError] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const [isSend, setIsSend] = useState(false)


    const handleReset = (event: any) => {
        event.preventDefault();
        console.log("handleReset")
        setEmailError("");

        // Send password reset email using Firebase
        sendPasswordResetEmail(authUser, email)
            .then(() => {
                setIsSend(true)
            })
            .catch((_error) => {
                console.error('Error sending password reset email:', error);
                if (_error.code === "auth/user-not-found") {
                    setEmailError("User not found with that email address.");
                } else {
                    setError(_error.message);
                    console.log(error)
                }
            });
    }

    const handleCancel = () => {
        setEmailError("")
        console.log("handleCancel")
        setIsSend(false)
        navigate(AUTH_SIGN_IN_ROUTE)

    }


    return (
        <Fade>
            <Box w={["full", "auto"]}
                 p={[8, 10]}
                 backgroundColor={isDark ? backgroundColor.dark : backgroundColor.light}
                 border={["none", "1px"]}
                 borderColor={['', colorElement]}
                 rounded={[0, 4, 10, 15]}>

                <VStack spacing={4} align={"flex-start"} w={"full"}>
                    <VStack spacing={1} align={["flex-start", "center"]} w={"full"}>
                        {isSend &&
                          <HeadingFade text1={"Ready"} text2={"We have sent you a link to reset your password"}/>}
                        {!isSend && <HeadingFade text1={"Reset Password"} text2={"We will send you a link to reset your password"}/>}
                    </VStack>
                    {!isSend
                        ? <Box w={"full"}>
                            <form onSubmit={handleReset}>
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
                                <Flex gap={[4, 8]} mt={6} wrap={"wrap"} w={"full"} justifyContent={"space-around"}>
                                    <Button {...buttonStyle} type={"submit"}>
                                        Reset
                                    </Button>
                                    <Button {...buttonStyle}
                                            onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                </Flex>
                            </form>
                        </Box>
                        : <Flex  w={"full"} justifyContent={"space-around"}>

                            <Button {...buttonStyle}
                                    onClick={handleCancel}>
                                Ok
                            </Button>
                        </Flex>}
                </VStack>
            </Box>
        </Fade>
    )
})


export default AuthResetPassword;