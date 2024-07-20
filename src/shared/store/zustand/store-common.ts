import {create} from "zustand";
import {ICommonStore} from "../../types.ts";

export const useCommon = create<ICommonStore>((set, get) => ({
    isStart: false,
    showStartPage: true,
    setShowStartPage: (showStartPage: boolean) => set({showStartPage}),
    mistakes: 0,
    isCongratulations: false,
    addMistakes: () => set({mistakes:get().mistakes + 1}),
    clearMistakes: () => set({mistakes:0}),
    setIsStart: (isStart: boolean) => set({isStart}),
    setIsCongratulations: (isCongratulations: boolean) => set({isCongratulations}),
    checkedItems:[],
    setCheckedItems: (index: number) => set((state) => ({
        checkedItems: index >= 0
            ? [...state.checkedItems, index]
            : state.checkedItems.filter((item) => item !==Math.abs(index)),
    })),

}))