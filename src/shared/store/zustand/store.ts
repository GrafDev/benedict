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
    elapsedTime: 0,
    getStartTime: (): number => get().startTime,
    setStartTime: () => set({
        elapsedTime: new Date().getTime() - get().startTime,
        startTime:new Date().getTime(),
    }),
}))

export const useCommon = create<ICommonStore>((set, get) => ({
    isStart: false,
    mistakes: 0,
    isCongratulations: false,
    toggleBG: () => set({isBG: !get().isBG}),
    isBG: false,
    addMistakes: () => set({mistakes:get().mistakes + 1}),
    clearMistakes: () => set({mistakes:0}),
    setIsStart: (isStart: boolean) => set({isStart}),
    setIsCongratulations: (isCongratulations: boolean) => set({isCongratulations}),
}))