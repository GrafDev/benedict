import {IDictionaryItem} from "../../shared/types.ts";
import {defaultDictionary} from "../../shared/store/constants/defaulDictionary.ts";

export const createAnswers = (previousQuestionWord:IDictionaryItem,questionWord:IDictionaryItem):IDictionaryItem[] => {
    const randomItems = [];
    for (let i = 9; i > 0; i--) {
        const randomItem = defaultDictionary[Math.floor(Math.random() * defaultDictionary.length)];
        randomItem.id!==questionWord.id?randomItems.push(randomItem):i++
        console.log(i,":",randomItem.word,"-",questionWord.word)
    }
    let shuffledArray=[...randomItems,previousQuestionWord];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffledArray[i];
        shuffledArray[i] = shuffledArray[j];
        shuffledArray[j] = temp;
    }
    console.log("shuffledArray",shuffledArray)
    return shuffledArray
}