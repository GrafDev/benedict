
export interface IVocabularyItem{
    id: string;
    mean: string;
    translate: string;
    learning: number;
    popular: number;
}



export interface IVocabulary {
    id: string;
    name: string;
    vocabulary: IVocabularyItem[]
}

export interface IVocabularyModalStore {
    editWord: IVocabularyItem;
    indexEditWord: number;
    setEditWord: (editWord: IVocabularyItem, indexEditWord: number) => void
}