import {IDictionaryItem} from "../../shared/types.ts";


export const createLearningWords = (
    _currentDict: IDictionaryItem[], _mainDict: IDictionaryItem[],
): IDictionaryItem[] => {

    for (let i = 0; i < _currentDict.length; i++) {
    }
    let _learningWords =
        [..._currentDict]

    if (_learningWords.length < 10) {
        let _filterDict = _mainDict.filter((word) => !_learningWords.includes(word)).sort(() => Math.random() - 0.5).slice(0, 10 - _learningWords.length)
        _learningWords = [..._learningWords, ..._filterDict]
    } else {
        _learningWords = _learningWords.sort(() => Math.random() - 0.5).slice(0, 10)
    }


    return _learningWords.sort(() => Math.random() - 0.5);

}