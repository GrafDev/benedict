import {create} from "zustand";
import {defaultDictionary, defaultWord} from "../constants/defaulDictionary.ts";
import {IDictionaryStore, ITimerStore, ICommonStore, IDictionaryItem} from "../../types.ts";
import {createLearningWords} from "../../../features/toGame";
import {createQuestionWord} from "../../../features/common";


export const useDict = create<IDictionaryStore>((set,get) => ({
    defaultDict: defaultDictionary,
    questionWord: defaultWord,
    previousQuestionWord: defaultWord,
    learningWords: [], // Learning
    setPreviousQuestionWord: () => set({previousQuestionWord:get().questionWord}),
    setQuestionWord: () => set({questionWord:createQuestionWord(get().learningWords,get().defaultDict, get().previousQuestionWord,get().questionWord)}),
    setLearningWords: () => set({learningWords:createLearningWords(get().defaultDict)}),
    shiftLearningWords: () => set({learningWords:get().learningWords.filter((word: IDictionaryItem) => word.id !== get().previousQuestionWord.id)}),
    clearLearningWords: () => set({learningWords:[]}),
    changeQuestionWord: () => set({previousQuestionWord:get().questionWord,
        questionWord:createQuestionWord(get().learningWords,get().defaultDict, get().previousQuestionWord,get().questionWord)}),
}))

export const useTimer = create<ITimerStore>((set, get) => ({
    startTime: 0,
    getStartTime: (): number => get().startTime,
    setStartTime: (startTime: number) => set({startTime}),
}))

export const useCommon = create<ICommonStore>((set, get) => ({
    isStart: false,
    toggleBG: () => set({isBG: !get().isBG}),
    isBG: false,
    setIsStart: (isStart: boolean) => set({isStart}),

}))