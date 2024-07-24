import React, {useEffect} from "react";
import {Grid, useColorMode} from "@chakra-ui/react";

import {Footer} from "../../widgets/footer";
import {Routers} from "../../pages/routers";
import {GET_BG_URL} from "../../shared/store/constants-store";
import {useLocation} from "react-router-dom";
import {AUTH_LINK, DICTIONARY_LINK, GAME_LINK, HOME_LINK} from "../../shared/constants-link.ts";
import {useCommon, useUI} from "../../shared/store/zustand";
import {useUser} from "../../shared/store/zustand";
import StartPage from "../../pages/start-page/start-page.tsx";
import {lingvoVocabulary} from "../../shared/store/constants-store/vocabularies/lingvo-vocabulary.ts";
import {defaultVocabulary} from "../../shared/store/constants-store/vocabularies/vocabulary-2500.ts";
import {easyVocabularyStore} from "../../shared/store/constants-store/vocabularies/easy-vocabulary.ts";
import Header from "../../widgets/header/Header.ui.tsx";
import FadingBackground from "../fading-background/fading-background.tsx";


const App: React.FC = () => {
    const isBG: boolean = useUI(state => state.isBG)
    const setLinkBG = useUI(state => state.setLinkBG)
    const location = useLocation()
    const isTrueLocation = [HOME_LINK, DICTIONARY_LINK, AUTH_LINK, GAME_LINK].includes(location.pathname);
    const showStartPage = useCommon(state => state.showStartPage)
    const isDarkTheme = useUI(state => state.isDarkTheme)
    const addVocabulary = useUser(state => state.addVocabulary)
    const setCurrentVocabularyIndex = useUser(state => state.setCurrentVocabularyIndex)


    // const [isMobile, setIsMobile] = useState(false)

    const {setColorMode} = useColorMode();
    useEffect(() => {
        if (isTrueLocation && isBG) {
            setLinkBG(GET_BG_URL)
        }
    }, [isBG]);



    useEffect(() => {
        setColorMode(isDarkTheme ? 'dark' : 'light')
    }, [isDarkTheme]);

    useEffect(() => {
        addVocabulary(defaultVocabulary)
        addVocabulary(easyVocabularyStore)
        addVocabulary(lingvoVocabulary)
        setCurrentVocabularyIndex(1)

    }, []);


    return (
        <div>
            <FadingBackground>

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

            </FadingBackground>


        </div>

    )
}

export default App;