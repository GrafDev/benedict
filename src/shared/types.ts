export interface IDictionaryItem {
    id: string;
    word: string;
    transcription?: string;
    descrip?: string;
    phrase?: string;
    noun?: string;
    verb?: string;
    adjective?: string;
    adverb?: string;
    conjunction?: string;
    interjection?: string;
    numeral?: string;
    part?: string;
    preposition?: string;
    pronoun?: string;
    learning: number;
    popular: number;
}


export interface IDictionary {
    dict: IDictionaryItem[];
    defaultDict: IDictionaryItem[];
    isStart: boolean;
    isBG: boolean;
    startTime: number;
    questionWord: IDictionaryItem;
    toggleBG: () => void;
    setIsStart: (isStart: boolean) => void;
    setDict: (word: IDictionaryItem) => void;
    clearDict: () => void;
    setStartTime: (startTime: number) => void;
    setQuestionWord: (questionWord: IDictionaryItem) => void;
}