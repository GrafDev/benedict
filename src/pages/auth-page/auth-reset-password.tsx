import {
    Box,
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    VStack,
    FormErrorMessage,
} from "@chakra-ui/react";

import {memo,  useState} from "react";
import {Fade} from "react-awesome-reveal";
import {buttonStyles} from "../../shared/ui/button-style.ts";
import useUI from "../../shared/hooks/use-ui.tsx";
import HeadingFade from "../../components/auth/heading-fade/heading-fade.tsx";

const AuthResetPassword = memo(( setOptionsAuthPage:any ) => {

    const {colorElement,backgroundColor,isDark, colorUI} = useUI()
    const [emailError, setEmailError] = useState("")
    const [email, setEmail] = useState("")

    const handleReset = () => {
        console.log("handleReset")
        setOptionsAuthPage("sign-in")
    }
    const handleCancel = () => {
        console.log("handleCancel")
        setOptionsAuthPage("sign-in")
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
                        <form>
                            <FormControl isInvalid={!!emailError} mb={4}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    value={email}
                                    id={"password"}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={"Enter your password"}
                                    rounded={["none", "md", "lg"]}
                                    variant={"filled"}
                                    type={"password"}
                                    mb={1}
                                />
                                <FormErrorMessage>{emailError}</FormErrorMessage>
                            </FormControl>
                            <HStack spacing={[4, 8]} mt={6} w={"full"} justifyContent={"start"}>
                                <Button {...buttonStyles(colorUI)} type={"submit"}
                                        onClick={handleReset}>
                                    Reset
                                </Button>
                                <Button {...buttonStyles(colorUI)}
                                        onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </HStack>
                        </form>
                    </Box>
                </VStack>
            </Box>
        </Fade>
    )
})


export default AuthResetPassword;