import React, {useEffect} from "react";
import {Box, Grid} from "@chakra-ui/react";
import {Footer} from "../../widgets/footer";
import {Routers} from "../../pages/routers";
import {useCommonStore} from "../../shared/store/zustand";
import StartPage from "../../pages/start-page/start-page.tsx";
import Header from "../../widgets/header/Header.ui.tsx";

import FadingBackground from "../fading-background/fading-background.tsx";
import '../../shared/store/firebase/firebase.ts'
import useStartMounting from "../../shared/hooks/use-start-mounting.ts";


const App: React.FC = () => {
    const showStartPage = useCommonStore(state => state.showStartPage)
    const {startMountingVocabularies, startMountingUser} = useStartMounting()

    useEffect(() => {
        // getCurrentUser()
        startMountingUser()
        startMountingVocabularies()
    }, []);


    return (
        <div>
            <FadingBackground/>
            <Box position="relative" zIndex={3}
                 w={"100%"}
                 display={'flex'}
                 justifyContent={'center'}
                 rounded={"md"}
            >

                {showStartPage ? <StartPage/>

                    : <Grid gridTemplateRows={'auto 1fr auto'}
                            minH={'100vh'}
                            minW={'100vw'}
                            mx={"auto"}
                    >
                        <Header/>
                        <Routers/>
                        <Footer/>
                    </Grid>}

            </Box>


        </div>

    );
}

export default App;