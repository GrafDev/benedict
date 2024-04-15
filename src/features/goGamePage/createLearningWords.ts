import {IDictionaryItem} from "../../shared/types.ts";


export const createLearningWords = (dictionary: IDictionaryItem[]) => {
    const randomItems: IDictionaryItem[] = [];
    if (dictionary.length > 9) {
        for (let i = 0; i < 10; i++) {

            const randomItem: IDictionaryItem = dictionary[Math.floor(Math.random() * dictionary.length)];
            if (!randomItems.includes(randomItem)) {

                randomItems.push(randomItem);
            } else {
                i--;
            }
        }
        return randomItems
    } else {
        return dictionary
    }
}
