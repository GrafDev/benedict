
import {create} from "zustand";
import {IDictionaryItem, IDictModalStore} from "../../types.ts";
import { emptyWord} from "../constants-store";

export const useDictModal = create<IDictModalStore>((set,get) => ({
    editWord: emptyWord,
    easyForm: false,
    setEasyForm: () => set({easyForm: !get().easyForm}),
    indexEditWord: -1,
    setEditWord: (_editWord: IDictionaryItem, _indexEditWord: number) => {
        set({editWord: _editWord, indexEditWord: _indexEditWord})
    }
}))