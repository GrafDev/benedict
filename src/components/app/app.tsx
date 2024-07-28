import React, {useEffect} from "react";
import {Box, Grid} from "@chakra-ui/react";
import { User } from "firebase/auth";
import {Footer} from "../../widgets/footer";
import {Routers} from "../../pages/routers";
import {useCommonStore} from "../../shared/store/zustand";
import {useUserStore} from "../../shared/store/zustand";
import StartPage from "../../pages/start-page/start-page.tsx";
import {easyVocabularyStore} from "../../shared/constants/vocabularies/easy-vocabulary.ts";
import Header from "../../widgets/header/Header.ui.tsx";
import {onAuthStateChanged} from 'firebase/auth';
import {authUser} from "../../shared/store/firebase/firebase.ts";

import FadingBackground from "../fading-background/fading-background.tsx";
import '../../shared/store/firebase/firebase.ts'
import { DEFAULT_VOCABULARY, LINGVO_VOCABULARY} from "../../shared/constants";
import makeUser from "../../features/user-features/make-user.ts";


const App: React.FC = () => {
    const showStartPage = useCommonStore(state => state.showStartPage)
    const addVocabulary = useUserStore(state => state.addVocabulary)
    const setCurrentVocabularyIndex = useUserStore(state => state.setCurrentVocabularyIndex)
    const setCurrentUser = useUserStore(state => state.setCurrentUser)

    useEffect(() => {
        // getCurrentUser()
        addVocabulary(DEFAULT_VOCABULARY)
        addVocabulary(LINGVO_VOCABULARY)
        addVocabulary(easyVocabularyStore)
        setCurrentVocabularyIndex(1)

    }, []);

    useEffect(() => {
        // ... other code

        const unsubscribe = onAuthStateChanged(authUser, (userCredential:User|null) => {
            setCurrentUser(makeUser(userCredential))
        });

        return () => unsubscribe();
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