import {IVocabularyItem} from "../../shared/types/vocabulary-types.ts";

export const removeWordFormDictionary = (dictionary: IVocabularyItem[], word: IVocabularyItem): IVocabularyItem[] => {
    return dictionary.filter(_word => _word.id !== word.id)
}