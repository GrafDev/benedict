import {
    VStack,
} from "@chakra-ui/react";
import {Fade} from "react-awesome-reveal";
import AuthSignIn from "../../components/auth/auth-sign-in.tsx";
import useAuth from "../../shared/hooks/use-auth.tsx";
import AuthDetails from "../../components/auth/auth-details.tsx";

const AuthPage = () => {
    const{isAuth}=useAuth()

    return (
        <Fade>
            <VStack
                display={"flex"}
                justifySelf={"start"}
                alignItems={"center"}
                w={"100%"}
                h={"100%"}
                mt={6}
                p={[0, 10, 10, 20]}
                fontSize={{base: "lg", sm: "lg", md: "large", lg: "large", xl: "x-large", "2xl": "xx-large"}}
            >
                {isAuth? (
                    <AuthDetails/>
                ) : (
                    <AuthSignIn/>
                )}

            </VStack>
        </Fade>

    )
}

export default AuthPage;