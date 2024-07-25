import {create} from "zustand";
import {readJsonLang} from "../../../features/common";
import {devtools} from "zustand/middleware";
import {TColorUI, TLanguage} from "../../types/ui-types.ts";
import {de, en, es, fr, it, rs, ru, ua} from "../languages";

export interface IUIStore {
    mainColor: { dark: string, light: string };
    backgroundColor: { dark: string, light: string };

    currentBG: string;
    setCurrentBG: (_currentBG: string) => void;
    newBG: string;
    setNewBG: (_newBG: string) => void;

    isBG: boolean;
    setIsBG: (_isBG: boolean) => void;
    isDarkTheme: boolean;
    setIsDarkTheme: (_isDarkTheme: boolean) => void;
    colorUI: TColorUI;
    setColorUI: (_colorUI: TColorUI) => void;
    translations: { [key: string]: any };
    language: TLanguage;
    setLanguage: (newLanguage: TLanguage) => void;


}

export const useUI = create<IUIStore>()(devtools((set) => ({

    mainColor: {dark: "gray.900", light: "gray.100"},
    backgroundColor: {dark: "gray.700", light: "gray.300"},

    currentBG: "",
    setCurrentBG: (_currentBG: string) => set({currentBG: _currentBG}, false, "currentUser-currentBG"),
    newBG: "",
    setNewBG: (_newBG: string) => set({newBG: _newBG}, false, "currentUser-newBG"),

    isBG: false,
    setIsBG: (_isBG: boolean) => set({isBG: _isBG}, false, "currentUser-isBG"),
    isDarkTheme: false,
    setIsDarkTheme: (_isDarkTheme: boolean) => set({isDarkTheme: _isDarkTheme}, false, "currentUser-isDarkTheme"),
    colorUI: "gray",
    setColorUI:
        (_colorUI: TColorUI) => {
            set({colorUI: _colorUI}, false, "currentUser-colorUI")
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
    },
}), {name: "ui"}))