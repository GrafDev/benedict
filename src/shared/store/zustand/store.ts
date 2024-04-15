import {create} from "zustand";
import {defaultDictionary, defaultWord} from "../constants/defaulDictionary.ts";
import {IDictionaryStore, IDictionaryItem} from "../../types.ts";
import {createAnswers} from "../../../features/createAnswers.ts";
import { createLearningWords } from "../../../features/createLearningWords.ts";


export const useDict = create<IDictionaryStore>((set, get) => ({
    answers: [],
    learningWords: [],
    learnedWords: [],
    defaultDict:defaultDictionary,
    isStart:false,
    isBG:false,
    startTime:0,
    questionWord:defaultWord,
    beforeQuestionWord:defaultWord,
    toggleBG:()=>set({isBG: !get().isBG} ),
    setIsStart: (isStart:boolean) => set({isStart}),
    setAnswers: (word:IDictionaryItem) => { set({answers: createAnswers(word)})},
    clearAnswers: () => set({answers: []}),
    setStartTime: (startTime:number) => set({startTime}),
    setQuestionWord: () => set({questionWord: get().learningWords[0]}),
    addLearnedWord: (word:IDictionaryItem) => set({learnedWords: [...get().learnedWords, word]}),
    setLearningWords: () => set({
        learningWords: createLearningWords(get().defaultDict)
    }),
}))
