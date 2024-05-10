import {IDictionaryItem} from "../../shared/types.ts";


export const createLearningWords = (
    _currentDict: IDictionaryItem[], _mainDict: IDictionaryItem[],
): IDictionaryItem[] => {

    // Создадим новый массив для ответов
    for (let i = 0; i < _currentDict.length; i++) {
        console.log(_currentDict[i])
    }
    let _learningWords =
        [..._currentDict]
    console.log("learningWords", _learningWords)

    if (_learningWords.length < 10) {
        let _filterDict = _mainDict.filter((word) => !_learningWords.includes(word)).sort(() => Math.random() - 0.5).slice(0, 10 - _learningWords.length)
        console.log("filterDict", _filterDict)
        _learningWords = [..._learningWords, ..._filterDict]
    } else {
        _learningWords = _learningWords.sort(() => Math.random() - 0.5).slice(0, 10)
    }

    console.log("Norm learningWords", _learningWords)

    return _learningWords.sort(() => Math.random() - 0.5);

}