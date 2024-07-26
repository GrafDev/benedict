import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {IVocabularyItem} from "../../types/vocabulary-types.ts";

export interface ICommonStore {
    isStart: boolean;
    showStartPage: boolean;
    setShowStartPage: (showStartPage: boolean) => void;
    isLearning: boolean;
    setIsLearning: (_isLearning: boolean) => void;
    isCongratulations: boolean;
    mistakes: number;
    addMistakes: () => void;
    clearMistakes: () => void;
    setIsStart: (isStart: boolean) => void;
    setIsCongratulations: (isCongratulations: boolean) => void;
    checkedItems: IVocabularyItem[];
    addCheckedItem: (item: IVocabularyItem) => void;
    removeCheckedItem: (item: IVocabularyItem) => void;
    clearCheckedItems: () => void;
}

export const useCommonStore = create<ICommonStore>()(devtools((set, get) => ({
    isStart: false,
    showStartPage: true,
    setShowStartPage: (showStartPage: boolean) => set({showStartPage}),

    isLearning: false,
    setIsLearning: (_isLearning: boolean) => {
        set({isLearning: _isLearning}, false, "isLearning");
    },

    isCongratulations: false,

    mistakes: 0,
    addMistakes: () => set({mistakes: get().mistakes + 1}),
    clearMistakes: () => set({mistakes: 0}),

    setIsStart: (isStart: boolean) => set({isStart}),
    setIsCongratulations: (isCongratulations: boolean) => set({isCongratulations}),

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
        }
    },
    clearCheckedItems: () => {
        set({checkedItems: []})
    }
}),{name: "common"}))