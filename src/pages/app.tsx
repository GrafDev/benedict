import React from "react";
import {Grid} from "@chakra-ui/react";

import {Header} from "../widgets/header";
import {Footer} from "../widgets/footer";
import {Game} from "./game";


const App: React.FC = () => {
    return (
        <Grid gridTemplateRows={'auto 1fr auto'}
              minH={'100vh'}
              minW={'100vw'}
              mx={"auto"}
        >
            <Header/>
            <Game/>
            <Footer/>
        </Grid>
    );
}

export default App;