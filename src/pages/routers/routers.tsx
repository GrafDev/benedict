import {Route, Routes, useLocation} from "react-router-dom";
import {AUTH_LINK, DICTIONARY_LINK, GAME_LINK, HOME_LINK, NOT_FOUND_LINK} from "../../shared/constants.ts";
import {GamePage} from "../game-page";
import {HomePage} from "../home-page";
import {AuthPage} from "../auth-page";
import {DictionariesPage} from "../dictionaries-page";
import {NotFoundPage} from "../not-found-page";

export const Routers = () => {
    const location = useLocation()
    const background = location.state && location.state.background
    return (
        <Routes location={background || location} >
            <Route index element={<HomePage/>}/>
            <Route path={NOT_FOUND_LINK} element={<NotFoundPage/>}/>
            <Route path={HOME_LINK} element={<HomePage/>}/>
            <Route path={GAME_LINK} element={<GamePage/>}/>
            <Route path={AUTH_LINK} element={<AuthPage/>}/>
            <Route path={DICTIONARY_LINK} element={<DictionariesPage/>}/>
        </Routes>
    )
}