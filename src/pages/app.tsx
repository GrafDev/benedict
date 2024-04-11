import React from "react";
import {Grid} from "@chakra-ui/react";

import {Header} from "../widgets/header";
import {Footer} from "../widgets/footer";
import {NDict} from "./ndict";


const App: React.FC = () => {
    return (
        <Grid gridTemplateRows={'auto 1fr auto'}
              minH={'100vh'}
              minW={'100vw'}
              mx={"auto"}
        >
            <Header/>
            <NDict/>
            <Footer/>
        </Grid>
    );
}

export default App;