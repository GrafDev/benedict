import React from "react";
import App from "../app/app.tsx";
import {ChakraUIProvider} from "../../shared/ui/chakra/chakra-provider.ui.tsx";
import {Routes, Route, HashRouter} from "react-router-dom";

const Providers: React.FC = () => {
    return (
        <ChakraUIProvider>
            <HashRouter>
                <Routes>
                    <Route path="*" element={<App/>} />
                </Routes>
            </HashRouter>
        </ChakraUIProvider>
    );
}

export default Providers;
