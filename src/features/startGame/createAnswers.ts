import {IDictionaryItem} from "../../shared/types.ts";

export const createAnswers = (dictionary: IDictionaryItem[],previousQuestionWord:IDictionaryItem,questionWord:IDictionaryItem):IDictionaryItem[] => {
    let randomItems:IDictionaryItem[] = [];
    for (let i = 9; i > 0; i--) {
        const randomItem: IDictionaryItem = dictionary[Math.floor(Math.random() * dictionary.length)];
        if(randomItem.id===previousQuestionWord.id||randomItem.id===questionWord.id) {
            i++
        }else{
            randomItems=[...randomItems,randomItem]
        }
        console.log(`${i}:${randomItem.word}-${questionWord.word}`)
    }
    let shuffledArray=[...randomItems,previousQuestionWord];

    return shuffledArray.sort(()=>Math.random()-0.5)
}


