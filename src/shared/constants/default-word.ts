import {IVocabularyItem} from "../types/vocabulary-types.ts";


export const DEFAULT_WORD: IVocabularyItem =     {
    id: "defaultWord",
    mean: "benedict",
    translate: "бенедикт",
    learning: 0,
    popular: 0
}

export const EMPTY_WORD: IVocabularyItem = {
    id: "",
    mean: "",
    translate: "",
    learning: 0,
    popular: 0
}