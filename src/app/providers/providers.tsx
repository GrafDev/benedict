import React from "react";
import App from "../app.tsx";
import {ChakraUIProvider} from "../../shared/ui/chakra/chakra-provider.ui.tsx";
import {HashRouter} from "react-router-dom";


const Provider: React.FC = () => {
    return (
        <ChakraUIProvider>
            <HashRouter>
                <App/>
            </HashRouter>
        </ChakraUIProvider>
    );
}

export default Provider;