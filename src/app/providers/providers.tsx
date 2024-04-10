import React from "react";
import App from "../../pages/app.tsx";
import {ChakraUIProvider} from "../../shared/ui/chakra/chakra-provider.ui.tsx";


const Provider: React.FC = () => {
    return (
        <ChakraUIProvider>
            <App

            />
        </ChakraUIProvider>
    );
}

export default Provider;