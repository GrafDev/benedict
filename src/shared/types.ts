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


export interface IDictionaryStore {
    defaultDict: IDictionaryItem[];
    questionWord: IDictionaryItem;
    previousQuestionWord: IDictionaryItem;
    learningWords: IDictionaryItem[];
    setPreviousQuestionWord: () => void;
    setQuestionWord: () => void;// Write beforeWord to beforeQuestionWord and get a new word from LearningWords
    setLearningWords: () => void;
    shiftLearningWords: () => void;
    clearLearningWords: () => void;
    changeQuestionWord: () => void;
}

export interface ITimerStore {
    startTime: number;
    setStartTime: (startTime: number) => void;
    getStartTime: () => number;
}

export interface ICommonStore {
    isStart: boolean;
    toggleBG: () => void;
    isBG: boolean;
    setIsStart: (isStart: boolean) => void;
}
