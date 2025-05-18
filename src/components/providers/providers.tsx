import React from "react";
import App from "../app/app.tsx";
import {ChakraUIProvider} from "../../shared/ui/chakra/chakra-provider.ui.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";

const Providers: React.FC = () => {
    return (
        <ChakraUIProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<App/>} />
                </Routes>
            </BrowserRouter>
        </ChakraUIProvider>
    );
}

export default Providers;
