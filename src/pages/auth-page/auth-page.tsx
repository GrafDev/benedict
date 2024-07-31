import {Flex, } from "@chakra-ui/react";
import {Fade} from "react-awesome-reveal";
import {Outlet} from "react-router";
import useAuth from "../../shared/hooks/use-auth.tsx";
import AuthDetails from "./auth-details.tsx";

export type TOptionsAuthPage = "sign-in" | "sign-up" | "details" | "reset";

const AuthPage = () => {
    const {isAuth} = useAuth()

    console.log("AuthPage", isAuth)
    return (
        <Fade>
            <Flex className={"AuthPage"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                w={"100%"}
                h={"100%"}
                fontSize={{base: "lg", sm: "lg", md: "large", lg: "large", xl: "x-large", "2xl": "xx-large"}}
            >
                {isAuth
                    ? <AuthDetails/>
                    : <Outlet/>
                }
            </Flex>
        </Fade>
    );
};

export default AuthPage;
