import {create} from "zustand";
import {defaultDictionary} from "../constants/defaulDictionary.ts";
import {IDictionary, IDictionaryItem} from "../../types.ts";
import {createDict} from "../../../features/createDict.ts";


export const useDict = create<IDictionary>((set,get) => ({
    dict: [],
    defaultDict:defaultDictionary,
    isStart:false,
    isBG:false,
    startTime:0,
    questionWord:defaultDictionary[0],
    toggleBG:()=>set({isBG: !get().isBG} ),
    setIsStart: (isStart:boolean) => set({isStart}),
    setDict: (word:IDictionaryItem) => { set({dict: createDict(word)})},
    clearDict: () => set({dict: []}),
    setStartTime: (startTime:number) => set({startTime}),
    setQuestionWord: (questionWord:IDictionaryItem) => set({questionWord}),
}))