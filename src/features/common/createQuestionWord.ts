import {IDictionaryItem} from "../../shared/types.ts";


export const createQuestionWord = (dictionary: IDictionaryItem[] | undefined,
                                   _currentDictionary: IDictionaryItem[],
                                   previousQuestionWord: IDictionaryItem,
                                   questionWord: IDictionaryItem): IDictionaryItem => {

    let _dictionary: IDictionaryItem[] = dictionary ? dictionary : _currentDictionary
    if (_dictionary.length === 1) {
        _dictionary = _currentDictionary
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

    if (!word) {
        word = _currentDictionary[Math.floor(Math.random() * _currentDictionary.length)]
    }
    return word

}


