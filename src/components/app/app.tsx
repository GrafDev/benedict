import React, {useEffect} from "react";
import {Box, Grid} from "@chakra-ui/react";

import {Footer} from "../../widgets/footer";
import {Routers} from "../../pages/routers";
import {useCommon} from "../../shared/store/zustand";
import {useUser} from "../../shared/store/zustand";
import StartPage from "../../pages/start-page/start-page.tsx";
import {lingvoVocabulary} from "../../shared/store/constants-store/vocabularies/lingvo-vocabulary.ts";
import {defaultVocabulary} from "../../shared/store/constants-store/vocabularies/vocabulary-2500.ts";
import {easyVocabularyStore} from "../../shared/store/constants-store/vocabularies/easy-vocabulary.ts";
import Header from "../../widgets/header/Header.ui.tsx";
import FadingBackground from "../fading-background/fading-background.tsx";


const App: React.FC = () => {
    const showStartPage = useCommon(state => state.showStartPage)
    const addVocabulary = useUser(state => state.addVocabulary)
    const setCurrentVocabularyIndex = useUser(state => state.setCurrentVocabularyIndex)

    useEffect(() => {
        addVocabulary(defaultVocabulary)
        addVocabulary(easyVocabularyStore)
        addVocabulary(lingvoVocabulary)
        setCurrentVocabularyIndex(1)

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