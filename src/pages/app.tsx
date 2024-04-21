import React from "react";
import {Box, Grid, useColorModeValue} from "@chakra-ui/react";

import {Header} from "../widgets/header";
import {Footer} from "../widgets/footer";
import {Routers} from "./routers";
import {makeBG} from "../features/common";


const App: React.FC = () => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const BG: string = makeBG(isDark);
    return (
        <Box
            background={BG}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
            w={"100%"}
            display={'flex'}
            justifyContent={'center'}
            rounded={"md"}>
            <Grid gridTemplateRows={'auto 1fr auto'}
                  minH={'100vh'}
                  minW={'100vw'}
                  mx={"auto"}
            >
                <Header/>
                <Routers/>
                <Footer/>
            </Grid>
        </Box>
    )
}

export default App;