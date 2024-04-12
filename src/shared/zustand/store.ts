import {create} from "zustand";
import {defaultDictionary} from "../store/constants/defaulDictionary.ts";
import {IDictionaryItem} from "../types.ts";
import {createDict} from "../../features/createDict.ts";

export const useDict = create((set:any,get:any) => ({
    dict: [],
    defaultDict:defaultDictionary,
    isStart:false,
    isBG:true,
    startTime:0,
    toggleBG:()=>set({isBG: !get().isBG} ),
    setIsStart: (isStart:boolean) => set({isStart}),
    setDict: (word:IDictionaryItem) => set({dict: createDict(word)}),
    clearDict: () => set({dict: []}),
    setStartTime: (startTime:number) => set({startTime}),
}))