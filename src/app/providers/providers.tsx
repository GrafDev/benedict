import React from "react";
import {ChakraProvider} from "@chakra-ui/react";
import App from "../../pages/app.tsx";


const Provider: React.FC = () => {
    return (
        <ChakraProvider>
                <App/>
        </ChakraProvider>
    );
}

export default Provider;