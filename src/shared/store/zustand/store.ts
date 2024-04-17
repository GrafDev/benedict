import {create} from "zustand";
import {defaultDictionary, defaultWord} from "../constants/defaulDictionary.ts";
import {IDictionaryStore,  ITimerStore, ICommonStore} from "../../types.ts";


export const useDict = create<IDictionaryStore>((set) => ({
    defaultDict: defaultDictionary,
    questionWord: defaultWord,
    previousQuestionWord: defaultWord,
    learningWords: [], // Learning
    setQuestionWord: () => set({}),
    setLearningWords: () => set({}),
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