import {IDictionaryItem} from "../../shared/types.ts";
import {defaultWord} from "../../shared/store/constants-store";

export const createQuestionWord = (
    _learningDict: IDictionaryItem[] | undefined,
    _currentDictionary: IDictionaryItem[],
    previousQuestionWord: IDictionaryItem,
    questionWord: IDictionaryItem,
    _mainDict: IDictionaryItem[],
): IDictionaryItem => {

    const availableWords: IDictionaryItem[] = [];
    //
    //
    if (_learningDict) {
        for (const word of _learningDict) {
            if (word.word !== previousQuestionWord.word && word.word !== questionWord.word) {
                availableWords.push(word);
            }
        }
    }

    if (availableWords.length === 0 && _learningDict) {
                availableWords.push(_learningDict[0]);
    }

    if (availableWords) {
        if (availableWords.length === 0) {
            throw new Error('No available words found');

        } else {

            const randomIndex = Math.floor(Math.random() * availableWords.length);
            return availableWords[randomIndex];
        }

    }
    return defaultWord

};
