import {IDictionaryItem} from "../../shared/types.ts";
import {defaultDictionary} from "../../shared/store/constants-store";




export const createLearningWords = (
    _currentDict: IDictionaryItem[],_mainDict: IDictionaryItem[],
): IDictionaryItem[] => {

    // Создадим новый массив для ответов
    for     (let i = 0; i < _currentDict.length; i++) {
        console.log(_currentDict[i])
    }
    const _learningWords=_currentDict.sort(() => Math.random() - 0.5)

    if (_learningWords.length < 10) {
        let _currentDict=defaultDictionary.filter((word) => !_learningWords.includes(word))
            _currentDict.sort(() => Math.random() - 0.5).slice(0, 10 - _learningWords.length)
        for (let word of _currentDict) {
            _learningWords.push(word)
        }
    }


    console.log("Norm learningWords", _learningWords)

return _learningWords.sort(() => Math.random() - 0.5);

}