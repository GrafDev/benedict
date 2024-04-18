import {IDictionaryItem} from "../../shared/types.ts";

export const createAnswers = (dictionary: IDictionaryItem[],previousQuestionWord:IDictionaryItem,questionWord:IDictionaryItem):IDictionaryItem[] => {
    let randomItems:IDictionaryItem[] = [];
  //напиши код который возвращает массив из 10 слова куда входят 9 случайных элементов из словаря и previousQuestionWord и не включающий в себя questionWord, напиши через цикл
    for(let i = 0; i < 9; i++){
        let randomIndex = Math.floor(Math.random() * dictionary.length);
        let randomWord = dictionary[randomIndex];
        while(randomWord.id === questionWord.id || randomWord.id === previousQuestionWord.id){
            randomIndex = Math.floor(Math.random() * dictionary.length);
            randomWord = dictionary[randomIndex];
        }
        randomItems.push(randomWord);
    }
    randomItems.splice(8,0,previousQuestionWord);
    randomItems=randomItems.sort(() => 0.5 - Math.random());
    console.log(randomItems)
    return randomItems;
}


