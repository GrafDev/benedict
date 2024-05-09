import {defaultDictionary} from "../../shared/store/constants-store";
import {IDictionaryItem} from "../../shared/types.ts";

export const createQuestionWord = (
    learningDict: IDictionaryItem[] | undefined,
    _currentDictionary: IDictionaryItem[],
    previousQuestionWord: IDictionaryItem,
    questionWord: IDictionaryItem
): IDictionaryItem => {

    const availableWords: IDictionaryItem[] = [];

    console.log(learningDict?.length)

    if (learningDict) {
        for (const word of learningDict) {
            if (word.word !== previousQuestionWord.word && word.word !== questionWord.word) {
                availableWords.push(word);
            }
        }
    }


    if (availableWords.length === 1) {
        for (const word of defaultDictionary) {
            if (word.word !== previousQuestionWord.word && word.word !== questionWord.word) {
                availableWords.push(word);
            }
        }
    }


    if (availableWords.length === 0) {
        throw new Error('No available words found');
    }



    const randomIndex = Math.floor(Math.random() * availableWords.length);
    return availableWords[randomIndex];
};
