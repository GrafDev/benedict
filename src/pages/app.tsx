import React from "react";
import {Grid} from "@chakra-ui/react";

import {Header} from "../widgets/header";
import {Footer} from "../widgets/footer";
import {Page} from "./ndict/Page.ui.tsx";


const App: React.FC = () => {
    return (
        <Grid gridTemplateRows={'auto 1fr auto'}
              minH={'100vh'}
              minW={'100vw'}
              mx={"auto"}
        >
            <Header/>
            <Page/>
            <Footer/>
        </Grid>
    );
}

export default App;