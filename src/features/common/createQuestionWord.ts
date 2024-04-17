import {IDictionaryItem} from "../../shared/types.ts";
import {getRandomWord} from "./index.ts";


export const createQuestionWord = (dictionary: IDictionaryItem[]|undefined, _defaultDictionary: IDictionaryItem[]): IDictionaryItem => {
    if (dictionary && dictionary.length > 0) {
        return getRandomWord(dictionary)
    } else {
        const temp= getRandomWord(_defaultDictionary)
        console.log("Question word ready: ",temp)
        return temp
    }
}
