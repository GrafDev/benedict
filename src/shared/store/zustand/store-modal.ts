
import {create} from "zustand";
import {IDictionaryItem, IDictModalStore} from "../../types.ts";
import { emptyWord} from "../constants";

export const useDictModal = create<IDictModalStore>((set) => ({
    editWord: emptyWord,
    indexEditWord: -1,
    setEditWord: (_editWord: IDictionaryItem, _indexEditWord: number) => {
        set({editWord: _editWord, indexEditWord: _indexEditWord})
    }
}))