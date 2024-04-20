import {IDictionaryItem} from "../../shared/types.ts";


export const createQuestionWord = (dictionary: IDictionaryItem[] | undefined,
                                   _defaultDictionary: IDictionaryItem[],
                                   previousQuestionWord: IDictionaryItem,
                                   questionWord: IDictionaryItem): IDictionaryItem => {
    console.log("createQuestionWord start", dictionary, _defaultDictionary, previousQuestionWord, questionWord)

    let _dictionary: IDictionaryItem[] = dictionary ? dictionary : _defaultDictionary
    if (_dictionary.length === 1) {
        _dictionary = _defaultDictionary
    }
    let word: IDictionaryItem = _dictionary[Math.floor(Math.random() * _dictionary.length)];
        for (let i = 0; i < _dictionary.length; i++) {
            if (word.id === previousQuestionWord.id || word.id === questionWord.id) {
                word = _dictionary[Math.floor(Math.random() * _dictionary.length)];
                i--;
            } else {
                break;
            }
        }

    console.log("createQuestionWord end", word)
    if (!word) {
        word = _defaultDictionary[Math.floor(Math.random() * _defaultDictionary.length)]
    }
    return word

}


