import React from "react";

import {Header} from "../../widgets/header";
import {MainPage} from "../../widgets/ndict";
import {Footer} from "../../widgets/footer";
import {ChakraProvider, Flex} from "@chakra-ui/react";


const Provider: React.FC = () => {
    return (
        <ChakraProvider>
            <Flex>
                    <Header/>
                    <MainPage/>
                    <Footer/>
            </Flex>
        </ChakraProvider>
    );
}

export default Provider;