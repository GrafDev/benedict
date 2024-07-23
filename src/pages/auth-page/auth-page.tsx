import {
    VStack,
} from "@chakra-ui/react";
import {Fade} from "react-awesome-reveal";
import AuthDetails from "../../components/auth/auth-details.tsx";
import AuthSignInUp from "../../components/auth/auth-sign-in-up.tsx";
import {useUser} from "../../shared/store/zustand";

const AuthPage = () => {
    const isAuth = useUser(state => state.isAuth)

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
                    <AuthSignInUp/>
                )}

            </VStack>
        </Fade>

    )
}

export default AuthPage;