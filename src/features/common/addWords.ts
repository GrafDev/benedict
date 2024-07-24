import {IVocabularyItem} from "../../shared/types/vocabulary-types.ts";

export const addWords = (_dictionary: IVocabularyItem[],defaultVocabulary:IVocabularyItem[]): IVocabularyItem[] => {
    const dictionary = [..._dictionary];

    if (dictionary.length < 10) {
        const missingWordsCount = 10 - dictionary.length;
        for (let i = 0; i < missingWordsCount; i++) {
            const randomDefaultWord:IVocabularyItem = defaultVocabulary[Math.floor(Math.random() * defaultVocabulary.length)];
            if (!dictionary.includes(randomDefaultWord)) {
                dictionary.push(randomDefaultWord);
            }else {
                i--;
            }
        }
    }

    return dictionary
}
