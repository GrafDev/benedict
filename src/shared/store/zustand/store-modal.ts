
import {create} from "zustand";
import {emptyWord} from "../constants-store/default-word.ts";
import {IVocabularyItem, IVocabularyModalStore} from "../../types/vocabulary-types.ts";


export const useDictModal = create<IVocabularyModalStore>((set) => ({
    editWord: emptyWord,
    indexEditWord: -1,
    setEditWord: (_editWord: IVocabularyItem, _indexEditWord: number) => {
        set({editWord: _editWord, indexEditWord: _indexEditWord})
    }
}))