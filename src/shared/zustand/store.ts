import {create} from "zustand";

export const useDict = create((set:any,get:any) => ({
    dict: [],
    isStart:false,
    isBG:true,
    toggleBG:()=>set({isBG: !get().isBG} )
}))