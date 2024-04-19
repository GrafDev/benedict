import {IDictionaryItem} from "../../shared/types.ts";
import {getRandomWord} from "./index.ts";


export const createQuestionWord = (dictionary: IDictionaryItem[]|undefined,
                                   _defaultDictionary: IDictionaryItem[],
                                   previousQuestionWord:IDictionaryItem,
                                   questionWord:IDictionaryItem): IDictionaryItem => {
    let _dictionary:IDictionaryItem[]=dictionary?dictionary:_defaultDictionary

        let word:IDictionaryItem=  _dictionary[Math.floor(Math.random() * _dictionary.length)];
        while(word.id === questionWord.id || word.id === previousQuestionWord.id){
            word=  _dictionary[Math.floor(Math.random() * _dictionary.length)];
        }
        return word

}
