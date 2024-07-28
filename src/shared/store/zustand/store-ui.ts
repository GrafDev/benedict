import {create} from "zustand";
import {readJsonLang} from "../../../features/common";
import {devtools} from "zustand/middleware";
import {TColorUI, TLanguage} from "../../types/ui-types.ts";
import {de, en, es, fr, it, rs, ru, ua} from "../../constants";

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