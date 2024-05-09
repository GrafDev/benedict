import {IDictionaryItem} from "../../shared/types.ts";
import {defaultDictionary} from "../../shared/store/constants-store";

export const createAnswers = (
    learningDict: IDictionaryItem[],
    currentDict: IDictionaryItem[],
    previousQuestionWord: IDictionaryItem
): IDictionaryItem[] => {

    // Создадим новый массив для ответов
    const answers: IDictionaryItem[] = [];

    // Добавим previousQuestionWord
    answers.push(previousQuestionWord);

    // Перемешаем learningDict
    const shuffledLearningDict = [...learningDict].sort(() => Math.random() - 0.5);

    // Добавим learningWords из learningDict
    for (let i = 0; i < shuffledLearningDict.length && answers.length < 10; i++) {
        if (!answers.includes(shuffledLearningDict[i])) {
            answers.push(shuffledLearningDict[i]);
        }
    }

    // Перемешаем currentDict
    const shuffledCurrentDict = [...currentDict].sort(() => Math.random() - 0.5);

    // Добавим слова из currentDict
    for (let i = 0; i < shuffledCurrentDict.length && answers.length < 10; i++) {
        if (!answers.includes(shuffledCurrentDict[i])) {
            answers.push(shuffledCurrentDict[i]);
        }
    }

    // Заполним оставшиеся места словами из defaultDict
    const shuffledDefaultDict = [...defaultDictionary].sort(() => Math.random() - 0.5);
    for (let i = 0; i < shuffledDefaultDict.length && answers.length < 10; i++) {
        if (!answers.includes(shuffledDefaultDict[i])) {
            answers.push(shuffledDefaultDict[i]);
        }
    }

    // Вернем перемешанный массив ответов
    return answers.sort(() => Math.random() - 0.5);
};
