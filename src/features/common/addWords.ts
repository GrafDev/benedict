import {easyDictionary} from "../../shared/store/constants-store";
import {IDictionaryItem} from "../../shared/types.ts";

export const addWords = (_dictionary: IDictionaryItem[]): IDictionaryItem[] => {
    const dictionary = [..._dictionary];

    if (dictionary.length < 10) {
        const missingWordsCount = 10 - dictionary.length;
        for (let i = 0; i < missingWordsCount; i++) {
            const randomDefaultWord:IDictionaryItem = easyDictionary[Math.floor(Math.random() * easyDictionary.length)];
            if (!dictionary.includes(randomDefaultWord)) {
                dictionary.push(randomDefaultWord);
            }else {
                i--;
            }
        }
    }

    return dictionary
}
