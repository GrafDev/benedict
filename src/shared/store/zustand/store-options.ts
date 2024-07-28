import {create} from "zustand";
import {readJsonLang} from "../../../features/common";
import {devtools} from "zustand/middleware";
import {TColorUI, TLanguage} from "../../types/ui-types.ts";
import {de, en, es, fr, it, rs, ru, ua} from "../../constants";

export interface IOptionsStore {
    mainColor: { dark: string, light: string };
    backgroundColor: { dark: string, light: string };

    isBG: boolean;
    setIsBG: (_isBG: boolean) => void;
    isDarkTheme: boolean;
    setIsDarkTheme: (_isDarkTheme: boolean) => void;
    colorUI: TColorUI;
    setColorUI: (_colorUI: TColorUI) => void;
    translations: { [key: string]: any };
    language: TLanguage;
    setLanguage: (newLanguage: TLanguage) => void;
    currentVocabularyId: string;
    setCurrentVocabularyId: (_currentVocabularyId: string) => void;
    readUserOptionsFromLocalStorage: () => void;
}

export const useOptionsStore = create<IOptionsStore>()(devtools((set) => ({
    mainColor: {dark: "gray.900", light: "gray.100"},
    backgroundColor: {dark: "gray.700", light: "gray.300"},
    isBG: false,
    setIsBG: (_isBG: boolean) =>{
        set({isBG: _isBG}, false, "currentUser-isBG")
        localStorage.setItem("benedictOptionIsBG", JSON.stringify(_isBG))
    },
    isDarkTheme: false,
    setIsDarkTheme: (_isDarkTheme: boolean) =>{
        set({isDarkTheme: _isDarkTheme}, false, "currentUser-isDarkTheme")
        localStorage.setItem("benedictOptionIsDarkTheme", JSON.stringify(_isDarkTheme))

    },
    colorUI: "gray",
    setColorUI:
        (_colorUI: TColorUI) => {
            set({colorUI: _colorUI}, false, "currentUser-colorUI")
            localStorage.setItem("benedictOptionColorUI", JSON.stringify(_colorUI))
        },
    translations: {
        en: readJsonLang(en), // Переводы для английского
        rs: readJsonLang(rs), // Переводы для сербского
        ua: readJsonLang(ua),// Переводы для украинского
        de: readJsonLang(de), // Переводы для немецкого
        fr: readJsonLang(fr),// Переводы для французского
        es: readJsonLang(es),// Переводы для испанского
        it: readJsonLang(it), // Переводы для итальянского
        ru: readJsonLang(ru), // Переводы для русского
    },
    language: "en",
    setLanguage: (_language:TLanguage) => {
        set({language: _language}, false, "currentUser-language")
        localStorage.setItem("benedictOptionLanguage", JSON.stringify(_language))
    },
    currentVocabularyId: "default",
    setCurrentVocabularyId: (_currentVocabularyId: string) => {
        set({currentVocabularyId: _currentVocabularyId}, false, "currentUser-currentVocabularyId")
      localStorage.setItem("benedictOptionCurrentVocabularyId", JSON.stringify(_currentVocabularyId))
    },
    readUserOptionsFromLocalStorage: () => {
        const _isBG = localStorage.getItem("benedictOptionIsBG")
        const _isDarkTheme = localStorage.getItem("benedictOptionIsDarkTheme")
        const _colorUI = localStorage.getItem("benedictOptionColorUI")
        const _language = localStorage.getItem("benedictOptionLanguage")
        const _currentVocabularyId = localStorage.getItem("benedictOptionCurrentVocabularyId")

        if (_isBG) {
            set({isBG: JSON.parse(_isBG)}, false, "currentUser-isBG")
        }
        if (_isDarkTheme) {
            set({isDarkTheme: JSON.parse(_isDarkTheme)}, false, "currentUser-isDarkTheme")
        }
        if (_colorUI) {
            set({colorUI: JSON.parse(_colorUI)}, false, "currentUser-colorUI")
        }
        if (_language) {
            set({language: JSON.parse(_language)}, false, "currentUser-language")
        }
        if (_currentVocabularyId) {
            set({currentVocabularyId: JSON.parse(_currentVocabularyId)}, false, "currentUser-currentVocabularyId")
        }
    },

}), {name: "ui"}))