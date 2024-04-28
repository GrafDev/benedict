import {create} from "zustand";
import {defaultDictionary, defaultWord} from "../constants";
import {IDictionaryStore, IDictionaryItem} from "../../types.ts";
import {createLearningWords} from "../../../features/toGame";
import {createQuestionWord} from "../../../features/common";


export const useDict = create<IDictionaryStore>((set,get) => ({
    currentDict: defaultDictionary, //Current dictionary
    mainDict: defaultDictionary,
    questionWord: defaultWord,
    previousQuestionWord: defaultWord,
    learningWords: [], // Learning
    isTranslate: false,
    lastTranslate: false,
    setPreviousQuestionWord: () => set({previousQuestionWord:get().questionWord}),
    setQuestionWord: () => set({
        questionWord:createQuestionWord(get().learningWords,get().currentDict, get().previousQuestionWord,get().questionWord),
        isTranslate:Math.random() < 0.5
    }),
    setLearningWords: () => set({learningWords:createLearningWords(get().currentDict)}),
    shiftLearningWords: () => set({learningWords:get().learningWords.filter((word: IDictionaryItem) => word.id !== get().previousQuestionWord.id)}),
    clearLearningWords: () => set({learningWords:[]}),
    changeQuestionWord: () => set({
        previousQuestionWord:get().questionWord,
        questionWord:createQuestionWord(get().learningWords,get().currentDict, get().previousQuestionWord,get().questionWord),
        lastTranslate:get().isTranslate,
        isTranslate: Math.random() < 0.5
    }),
    setWordToCurrentDict: (word:IDictionaryItem,index:number) =>
        set({currentDict: [...get().currentDict.slice(0, index), word, ...get().currentDict.slice(index + 1)]}),
    addWordToCurrentDict: (word:IDictionaryItem) =>
        set({currentDict: [...get().currentDict, word]}),
    deleteWordFromCurrentDict: (index:number) => set({currentDict: [...get().currentDict.slice(0, index), ...get().currentDict.slice(index + 1)]})
}))





