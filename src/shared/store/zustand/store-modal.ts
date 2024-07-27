
import {create} from "zustand";
import {EMPTY_WORD} from "../../constants/default-word.ts";
import {IVocabularyItem, IVocabularyModalStore} from "../../types/vocabulary-types.ts";


export const useModalStore = create<IVocabularyModalStore>((set) => ({
    editWord: EMPTY_WORD,
    indexEditWord: -1,
    setEditWord: (_editWord: IVocabularyItem, _indexEditWord: number) => {
        set({editWord: _editWord, indexEditWord: _indexEditWord})
    }
}))