import {create} from "zustand";
import {ICommonStore} from "../../types.ts";

export const useCommon = create<ICommonStore>((set, get) => ({
    isStart: false,
    showStartPage: true,
    setShowStartPage: (showStartPage: boolean) => set({showStartPage}),
    mistakes: 0,
    isCongratulations: false,
    addMistakes: () => set({mistakes: get().mistakes + 1}),
    clearMistakes: () => set({mistakes: 0}),
    setIsStart: (isStart: boolean) => set({isStart}),
    setIsCongratulations: (isCongratulations: boolean) => set({isCongratulations}),

    haveWordsForCopy: false,
    setHaveWordsForCopy: (haveWordsForCopy: boolean) => set({haveWordsForCopy}),
    checkedItems: [],
    addCheckedItem: (item) => {
        set((state) => {
            // Проверяем, есть ли элемент в списке
            if (!state.checkedItems.some((existingItem) => existingItem.id === item.id)) {
                return {checkedItems: [...state.checkedItems, item]};
            }

            return state;
        })
    },
    removeCheckedItem: (item) => {
        set((state) => {
            // Удаляем элемент из списка
            const updatedItems = state.checkedItems.filter((existingItem) => existingItem.id !== item.id);
            return {checkedItems: updatedItems};
        });
        if (get().checkedItems.length === 0) {
            get().setHaveWordsForCopy(false)
        }
    },
    clearCheckedItems: () => {
        set({checkedItems: []})
        get().setHaveWordsForCopy(false)
    }
}))