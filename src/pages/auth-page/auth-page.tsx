import { VStack } from "@chakra-ui/react";
import { Fade } from "react-awesome-reveal";
import {Outlet} from "react-router";

export type TOptionsAuthPage = "sign-in" | "sign-up" | "details" | "reset";

const AuthPage = () => {
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
                fontSize={{ base: "lg", sm: "lg", md: "large", lg: "large", xl: "x-large", "2xl": "xx-large" }}
            >
                    <Outlet />
            </VStack>
        </Fade>
    );
};

export default AuthPage;
