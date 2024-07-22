import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Text, useColorModeValue,
    VStack
} from "@chakra-ui/react";
import {useUI, useUser} from "../../shared/store/zustand";
import {useState} from "react";
import {Fade} from "react-awesome-reveal";
import {buttonStyles} from "../../shared/ui/button-style.ts";

const AuthSignInUp = () => {
    const colorUI = useUser(state => state.currentUser.colorUI)
    const colorElement = `${colorUI}.600`
    const isDark = useColorModeValue('light', 'dark') === 'dark';
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const backgroundColor = useUI(state => state.backgroundColor)
    const [isSignIn, setIsSignIn] = useState(true)

    const handleConfirm = () => {
        if (password !== confirmPassword && !isSignIn) {
            setError("Password does not match")
            console.log(error)
            return
        }
        console.log("Sign In")
    }

    const switchSignUp = () => {
        setIsSignIn(!isSignIn)
    }

    const handleClose = () => {
        console.log("Cancel")
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
                 rounded={[0, 4, 10,15]}>

                <VStack spacing={4}  align={"flex-start"} w={"full"}>
                    <VStack spacing={1} align={["flex-start", "center"]} w={"full"}>
                        <Heading color={colorElement}>
                            {isSignIn ? "Sign In" : "Sign Up"}
                        </Heading>
                        <Text>
                            {!isSignIn ? "Don't have an account?" : "Already have an account?"}
                        </Text>
                    </VStack>
                    <FormControl onSubmit={() => handleConfirm()}>
                        <FormLabel>Email</FormLabel>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)}
                               rounded={["none", "md", "lg"]} variant={"filled"} type={"email"} mb={2}/>
                        <FormLabel>Password</FormLabel>
                        <Input value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               rounded={["none", "md", "lg"]} variant={"filled"} type={"password"}
                               mb={!isSignIn ? 2 : 14}/>
                        {!isSignIn && <Input value={confirmPassword}
                                             onChange={(e) => setConfirmPassword(e.target.value)}
                                             rounded={["none", "md", "lg"]} variant={"filled"} type={"password"}
                                             mb={2}/>}
                        <HStack w={"full"} justifyContent={"space-between"} mb={2}>
                            <Checkbox colorScheme={colorUI}>
                                <Text fontSize={{base: "sm", md: "md", lg: "lg"}}>Remember me.</Text>
                            </Checkbox>
                            {isSignIn && <Button variant={"link"} color={colorElement}>Forgot password?</Button>}
                        </HStack>
                        <HStack spacing={[4, 8]} mt={6} w={"full"} justifyContent={"start"}>
                            <Button  {...buttonStyles(colorUI)}
                                     onClick={() => handleConfirm()}>
                                {isSignIn ? "Sign In" : "Sign Up"}
                            </Button>
                            <Button variant={"link"}
                                    color={colorElement}
                                    onClick={() => switchSignUp()}
                            >
                                {isSignIn ? "Sign Up" : "Sign In"}
                            </Button>
                        </HStack>

                    </FormControl>
                </VStack>
            </Box>
        </Fade>
    )
}
export default AuthSignInUp;