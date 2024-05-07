import {IDictionaryItem} from "../../shared/types.ts";
import {addWords} from "../common";

export const createLearningWords = (dictionary: IDictionaryItem[]): IDictionaryItem[] => {
    const _dictionary = addWords(dictionary)
    const newArr: IDictionaryItem[] = [];
    for (let i = 0; i < 10; i++) {
        const randomItem = _dictionary[Math.floor(Math.random() * _dictionary.length)];
        if (newArr.includes(randomItem)) {
            i--;
        } else {
            newArr.push(randomItem);
        }
    }
    return newArr
}