import {create} from "zustand";
import {readJsonLang} from "../../../features/common";
import {devtools} from "zustand/middleware";
import {TColorUI, TLanguage} from "../../types/ui-types.ts";
import {DE, EN, ES, FR, IT, RS, RU, UA} from "../../constants";

export interface IUIStore {
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


}

export const useUIStore = create<IUIStore>()(devtools((set) => ({

    mainColor: {dark: "gray.900", light: "gray.100"},
    backgroundColor: {dark: "gray.700", light: "gray.300"},
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
        en: readJsonLang(EN), // Переводы для английского
        rs: readJsonLang(RS), // Переводы для сербского
        ua: readJsonLang(UA),// Переводы для украинского
        de: readJsonLang(DE), // Переводы для немецкого
        fr: readJsonLang(FR),// Переводы для французского
        es: readJsonLang(ES),// Переводы для испанского
        it: readJsonLang(IT), // Переводы для итальянского
        ru: readJsonLang(RU), // Переводы для русского
    },
    language: "en",
    setLanguage: (_language:TLanguage) => {
        set({language: _language}, false, "currentUser-language")
    },
}), {name: "ui"}))