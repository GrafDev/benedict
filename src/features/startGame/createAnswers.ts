import {IDictionaryItem} from "../../shared/types.ts";
import {addWords} from "../common";

export const createAnswers = (learningDict: IDictionaryItem[],currentDict: IDictionaryItem[], previousQuestionWord: IDictionaryItem): IDictionaryItem[] => {

    let randomItems: IDictionaryItem[] = [];
    const dictionary = [...learningDict, ...currentDict];
    console.log("start createAnswers",dictionary, previousQuestionWord)

    for (let i = 0; i < 9; i++) {
        let randomIndex = Math.floor(Math.random() * dictionary.length);
        let randomWord = dictionary[randomIndex];
        let flag = true;
        if (randomWord.id === previousQuestionWord.id) {
           flag = false;
           continue;
        }
        for (let j = 0; j < randomItems.length; j++) {
            if (randomItems[j].id === randomWord.id) {
                flag = false;
                break;
            }
        }
        if (!flag) {
            i--;
        }else {
            randomItems.push(randomWord);
        }
    }
    randomItems.splice(8, 0, previousQuestionWord);
    let _randomItems = addWords(randomItems)
    randomItems = _randomItems.sort(() => 0.5 - Math.random());
    console.log("end createAnswers",randomItems)
    return randomItems;
}


