import {IDictionaryItem} from "../../shared/types.ts";

export const createLearningWords = (dictionary: IDictionaryItem[]): IDictionaryItem[] => {
    const newArr: IDictionaryItem[] = [];
    for (let i = 0; i < 10; i++) {
        const randomItem = dictionary[Math.floor(Math.random() * dictionary.length)];
        if (newArr.includes(randomItem)) {
            i--;
        } else {
            newArr.push(randomItem);
        }
    }
    return newArr
}