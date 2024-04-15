import {create} from "zustand";
import {defaultDictionary, defaultWord} from "../constants/defaulDictionary.ts";
import {IDictionaryStore, IDictionaryItem} from "../../types.ts";
import {createAnswers} from "../../../features/startGame";
import {createLearningWords} from "../../../features/goGamePage";


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
    setQuestionWord: (word:IDictionaryItem) => set({questionWord: word}),// TODO: need random word from dictionary
    setPreviousQuestionWord: () => set({beforeQuestionWord: get().questionWord}),
    addLearnedWord: (word:IDictionaryItem) => set({learnedWords: [...get().learnedWords, word]}),
    setLearningWords: () => set({
        learningWords: createLearningWords(get().defaultDict)
    }),
}))
