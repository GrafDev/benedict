import {create} from "zustand";
import {ILangStore} from "../../types.ts";
import {devtools} from "zustand/middleware";


export const useLang = create<ILangStore>()(devtools((set) => ({
    language: 'en', // Начальный язык
    translations: {
        en: require('../languages/en.json'), // Переводы для английского
        ru: require('../languages/ru.json'), // Переводы для русского
    },
    setLanguage: (newLanguage) => {
        set((state) => ({
            ...state,
            language: newLanguage,
        }));
    },
}),{name: "ui"}))