import {IDictionaryItem} from "../shared/types.ts";
import {defaultDictionary} from "../shared/store/constants/defaulDictionary.ts";

export const createDict = (word:IDictionaryItem):IDictionaryItem[] => {
    const randomItems = [];
    for (let i = 0; i < 9; i++) {
        const randomItem = defaultDictionary[Math.floor(Math.random() * defaultDictionary.length)];
        randomItems.push(randomItem);
    }
    let shuffledArray=[...randomItems,word];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffledArray[i];
        shuffledArray[i] = shuffledArray[j];
        shuffledArray[j] = temp;
    }

    return shuffledArray
}