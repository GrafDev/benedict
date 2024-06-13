import {Route, Routes, useLocation} from "react-router-dom";
import {
    AUTH_LINK,
    DICTIONARY_LINK,
    GAME_LINK,
    HELP_LINK,
    HOME_LINK,
    NOT_FOUND_LINK
} from "../../shared/constants-ui.ts";
import {lazy, Suspense} from "react";
import {Spinner} from "@chakra-ui/react";

const GamePage = lazy(() => import('../game-page/game-page')) as any;
const HomePage = lazy(() => import('../home-page/home-page')) as any;
const AuthPage = lazy(() => import('../auth-page/auth-page')) as any;
const DictionariesPage = lazy(() => import('../dictionaries-page/dictionaries-page')) as any;
const NotFoundPage = lazy(() => import('../not-found-page/not-found-page')) as any;
const HelpPage = lazy(() => import('../help-page/help-page')) as any;

export const Routers = () => {
    const location = useLocation()
    const background = location.state && location.state.background
    return (
        <Routes location={background || location} >
            <Route index element={<Suspense fallback={<Spinner/>}><HomePage/></Suspense>}/>
            <Route path={NOT_FOUND_LINK} element={<Suspense fallback={<Spinner/>}><NotFoundPage/></Suspense>}/>
            <Route path={HOME_LINK} element={<Suspense fallback={<Spinner/>}><HomePage/></Suspense>}/>
            <Route path={GAME_LINK} element={<Suspense fallback={<Spinner/>}><GamePage/></Suspense>}/>
            <Route path={AUTH_LINK} element={<Suspense fallback={<Spinner/>}><AuthPage/></Suspense>}/>
            <Route path={HELP_LINK} element={<Suspense fallback={<Spinner/>}><HelpPage/></Suspense>}/>
            <Route path={DICTIONARY_LINK} element={<Suspense fallback={<Spinner/>}><DictionariesPage/></Suspense>}/>
        </Routes>
    )
}