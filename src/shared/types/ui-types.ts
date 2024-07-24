export type TColorUI ="gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "cyan" | "purple" | "pink"
export type TLanguage = "en" | "rs" | "ua" | "de" | "fr" | "es" | "it" | "ru"

export interface IUIStore {
    linkBG: string;
    setLinkBG: (BG: string[]) => void;
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