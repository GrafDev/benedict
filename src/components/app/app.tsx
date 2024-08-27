import React, {useEffect} from "react";
import {Box, Grid} from "@chakra-ui/react";
import {Footer} from "@/widgets/footer";
import {Routers} from "@/pages/routers";
import {useCommonStore, useUserStore} from "@/shared/store/zustand";
import StartPage from "@/pages/start-page/start-page.tsx";
import Header from "@/widgets/header/Header.ui.tsx";

import FadingBackground from "../fading-background/fading-background.tsx";
import '@/shared/store/firebase/firebase.ts'
import useStartMounting from "@/shared/hooks/use-start-mounting.ts";
import {IUser} from "@/shared/types/user-types.ts";
import {DEFAULT_VOCABULARY} from "@/shared/constants";


const App: React.FC = () => {
    const showStartPage = useCommonStore(state => state.showStartPage)
    const setIsLoading=useUserStore(state => state.setIsLoading)
    const setCurrentUser = useUserStore(state => state.setCurrentUser)
    const addVocabulary = useUserStore(state => state.addVocabulary)
    const { startMountingUser} = useStartMounting()
    const loadVocabulariesFromServer = useUserStore(state => state.loadVocabulariesFromServer)
const loadUserRecordFromServer = useUserStore(state => state.loadUserRecordFromServer)
    useEffect(() => {
        // getCurrentUser()
        addVocabulary(DEFAULT_VOCABULARY)
        // addVocabulary(LINGVO_VOCABULARY)
        startMountingUser()
            .then((user: IUser) => {
                setCurrentUser(user);

                if (user.id!=="0"){
                    loadUserRecordFromServer(user.id)
                    loadVocabulariesFromServer(user.id)
                }
                console.log("Пользователь аутентифицирован:", user);
            })
            .catch((error) => {
                console.error("Ошибка при проверке аутентификации:", error);
            });
        setIsLoading(false)
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
                            minH={'100dvh'}
                            minW={'100dvw'}
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
