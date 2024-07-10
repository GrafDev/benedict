import React, {useEffect} from "react";
import {Box, Grid, useColorMode, useColorModeValue} from "@chakra-ui/react";

import {Header} from "../../widgets/header";
import {Footer} from "../../widgets/footer";
import {Routers} from "../../pages/routers";
import {makeBG} from "../../features/common";
import {GET_BG_URL} from "../../shared/store/constants-store";
import {useLocation} from "react-router-dom";
import {AUTH_LINK, DICTIONARY_LINK, GAME_LINK, HOME_LINK} from "../../shared/constants-link.ts";
import {useCommon, useUI} from "../../shared/store/zustand";
import {useUser} from "../../shared/store/zustand";
import StartPage from "../../pages/start-page/start-page.tsx";
import {defaultVocabulary} from "../../shared/store/constants-store/vocabulary-2500.ts";


const App: React.FC = () => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const isBG: boolean = useUser(state => state.currentUser.isBG)
    const setLinkBG = useUI(state => state.setLinkBG)
    const BG = useUI(state => state.linkBG)
    const location = useLocation()
    const isTrueLocation = [HOME_LINK, DICTIONARY_LINK, AUTH_LINK, GAME_LINK].includes(location.pathname);
    const showStartPage = useCommon(state => state.showStartPage)
    const retrievingUser = useUser(state => state.retrievingUser)
    const isDarkTheme = useUser(state => state.currentUser.isDarkTheme)
    const addListVocabularies = useUser(state => state.addListVocabularies)

    // const [isMobile, setIsMobile] = useState(false)

    const {setColorMode} = useColorMode();

        useEffect(() => {
            const time=showStartPage ? 1500 : 0
            const timeoutId = setTimeout(() => {
                isTrueLocation && isBG && setLinkBG(GET_BG_URL)
            },  time);
            return () => clearTimeout(timeoutId);
    }, [isBG]);

    useEffect(() => {
        retrievingUser()
    }, []);

    useEffect(() => {
            setColorMode(isDarkTheme ? 'dark' : 'light')
    }, [isDarkTheme]);

    useEffect(() => {
        addListVocabularies([defaultVocabulary])
    }, []);

    return (
        <div>
            <Box
                background={makeBG(isDark, BG)}
                backgroundSize={"cover"}
                backgroundPosition={"center"}
                w={"100%"}
                display={'flex'}
                justifyContent={'center'}
                rounded={"md"}>
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

    )
}

export default App;