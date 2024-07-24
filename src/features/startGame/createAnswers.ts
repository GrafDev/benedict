import { IVocabularyItem} from "../../shared/types.ts";

export const createAnswers = (
    learningDict: IVocabularyItem[],
    currentDict: IVocabularyItem[],
    previousQuestionWord: IVocabularyItem,
    defaultVocabulary: IVocabularyItem[],
): IVocabularyItem[] => {

    // Создадим новый массив для ответов
    const answers: IVocabularyItem[] = [];

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
    const shuffledDefaultDict = [...defaultVocabulary].sort(() => Math.random() - 0.5);
    for (let i = 0; i < shuffledDefaultDict.length && answers.length < 10; i++) {
        if (!answers.includes(shuffledDefaultDict[i])) {
            answers.push(shuffledDefaultDict[i]);
        }
    }
const temp = answers.sort(() => Math.random()-0.5)
    // Вернем перемешанный массив ответов
    return temp.sort(() => Math.random()-0.5);
};
