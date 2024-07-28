import {VStack} from "@chakra-ui/react";
import {Fade} from "react-awesome-reveal";
import {Outlet} from "react-router";
import {useUserStore} from "../../shared/store/zustand";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import useAuth from "../../shared/hooks/use-auth.tsx";
import AuthDetails from "./auth-details.tsx";

export type TOptionsAuthPage = "sign-in" | "sign-up" | "details" | "reset";

const AuthPage = () => {
    const saveVocabulariesToServer = useUserStore(store => store.saveVocabulariesToServer)
    const location = useLocation();
    const isAuth = useAuth()

    useEffect(() => {
        // Эта функция будет вызываться каждый раз, когда меняется location
        saveVocabulariesToServer()
    }, [location.pathname]);
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
                {isAuth
                    ? <AuthDetails/>
                    : <Outlet/>
                }
            </VStack>
        </Fade>
    );
};

export default AuthPage;
