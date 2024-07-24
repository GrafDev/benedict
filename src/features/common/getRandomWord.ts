import {IVocabularyItem} from "../../shared/types/vocabulary-types.ts";

export const getRandomWord = (dictionary: IVocabularyItem[]):IVocabularyItem =>  dictionary[Math.floor(Math.random() * dictionary.length)];
