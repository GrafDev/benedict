import {DEFAULT_WORD} from "../../shared/constants";
import {IVocabularyItem} from "../../shared/types/vocabulary-types.ts";

export const createQuestionWord = (
                                       _learningDict:IVocabularyItem[],
                                       previousQuestionWord:IVocabularyItem,
                                       questionWord:IVocabularyItem,
                                    ): IVocabularyItem => {

    const availableWords: IVocabularyItem[] = [];
    if (_learningDict) {
        for (const word of _learningDict) {
            if (word.mean !== previousQuestionWord.mean && word.mean !== questionWord.mean) {
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
    return DEFAULT_WORD

};
