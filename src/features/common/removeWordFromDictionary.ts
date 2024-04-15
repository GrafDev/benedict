import {IDictionaryItem} from "../../shared/types.ts";

export const removeWordFormDictionary = (dictionary: IDictionaryItem[], word: IDictionaryItem): IDictionaryItem[] => {
    return dictionary.filter(_word => _word.id !== word.id)
}