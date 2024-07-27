import { Routes, Route, useLocation } from "react-router-dom";
import {
    AUTH_ROUTE,
    VOCABULARY_ROUTE,
    GAME_ROUTE,
    HOME_ROUTE,
    NOT_FOUND_ROUTE,
    AUTH_DETAILS_ROUTE,
    AUTH_SIGN_IN_ROUTE,
    AUTH_SIGN_UP_ROUTE,
    AUTH_RESET_PASSWORD_ROUTE
} from "../../shared/constants";
import { lazy, Suspense } from "react";
import Spinner from "../../widgets/spinners/spinner.tsx";
import HomePage from "../home-page/home-page.tsx";

const GamePage = lazy(() => import('../game-page/game-page'));
const AuthPage = lazy(() => import('../auth-page/auth-page'));
const NotFoundPage = lazy(() => import('../not-found-page/not-found-page'));
const VocabulariesPage = lazy(() => import('../vocabularies-page/vocabularies-page'));
const AuthDetails = lazy(() => import('../auth-page/auth-details.tsx'));
const AuthSignIn = lazy(() => import('../auth-page/auth-sign-in.tsx'));
const AuthSignUp = lazy(() => import('../auth-page/auth-sing-up.tsx'));
const AuthResetPassword = lazy(() => import('../auth-page/auth-reset-password.tsx'));

export const Routers = () => {
    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <Routes location={background || location}>
            <Route index element={<HomePage />} />
            <Route path={NOT_FOUND_ROUTE} element={<Suspense fallback={<Spinner />}><NotFoundPage /></Suspense>} />
            <Route path={HOME_ROUTE} element={<HomePage />} />
            <Route path={GAME_ROUTE} element={<Suspense fallback={<Spinner />}><GamePage /></Suspense>} />
            <Route path={AUTH_ROUTE} element={<Suspense fallback={<Spinner />}><AuthPage /></Suspense>}>
                <Route path={AUTH_DETAILS_ROUTE} element={<Suspense fallback={<Spinner />}><AuthDetails /></Suspense>} />
                <Route path={AUTH_SIGN_IN_ROUTE} element={<Suspense fallback={<Spinner />}><AuthSignIn /></Suspense>} />
                <Route path={AUTH_SIGN_UP_ROUTE} element={<Suspense fallback={<Spinner />}><AuthSignUp /></Suspense>} />
                <Route path={AUTH_RESET_PASSWORD_ROUTE} element={<Suspense fallback={<Spinner />}><AuthResetPassword /></Suspense>} />
            </Route>
            <Route path={VOCABULARY_ROUTE} element={<Suspense fallback={<Spinner />}><VocabulariesPage /></Suspense>} />
        </Routes>
    );
};