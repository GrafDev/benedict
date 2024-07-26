import {Route, Routes, useLocation} from "react-router-dom";
import {
    AUTH_LINK,
    VOCABULARY_LINK,
    GAME_LINK,
    HOME_LINK,
    NOT_FOUND_LINK
} from "../../shared/constants-link.ts";
import {lazy, Suspense} from "react";
import Spinner from "../../widgets/spinners/spinner.tsx";
import HomePage from "../home-page/home-page.tsx";

const GamePage = lazy(() => import('../game-page/game-page')) as any;
const AuthPage = lazy(() => import('../auth-page/auth-page')) as any;
// const AuthSignIn = lazy(() => import('../../components/auth/auth-sign-in-up.tsx')) as any;
// const DictionariesPage = lazy(() => import('../dictionaries-page/dictionaries-page')) as any;
const NotFoundPage = lazy(() => import('../not-found-page/not-found-page')) as any;
const VocabulariesPage = lazy(() => import('../vocabularies-page/vocabularies-page')) as any;

export const Routers = () => {
    const location = useLocation()
    const background = location.state && location.state.background
    return (
        <Routes location={background || location} >
            <Route index element=<HomePage/>/>
            <Route path={NOT_FOUND_LINK} element={<Suspense fallback={<Spinner/>}><NotFoundPage/></Suspense>}/>
            <Route path={HOME_LINK} element=<HomePage/>/>
            <Route path={GAME_LINK} element={<Suspense fallback={<Spinner/>}><GamePage/></Suspense>}/>
            <Route path={AUTH_LINK} element={<Suspense fallback={<Spinner/>}><AuthPage/></Suspense>}/>
            <Route path={VOCABULARY_LINK} element={<Suspense fallback={<Spinner/>}><VocabulariesPage/></Suspense>}/>
        </Routes>
    )
}