import {IDictionaryItem} from "../../shared/types.ts";

export const createLearningWords = (dictionary: IDictionaryItem[]): IDictionaryItem[] => {
    console.log("createLearningWords start", dictionary)
    const newArr: IDictionaryItem[] = [];
    for (let i = 0; i < 10; i++) {
        const randomItem = dictionary[Math.floor(Math.random() * dictionary.length)];
        if (newArr.includes(randomItem)) {
            i--;
        } else {
            newArr.push(randomItem);
        }
    }
    console.log("createLearningWords end", newArr)
    return newArr
}