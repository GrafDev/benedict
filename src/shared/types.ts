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
    answers: IDictionaryItem[];
    learningWords: IDictionaryItem[];
    learnedWords: IDictionaryItem[];
    defaultDict: IDictionaryItem[];
    isStart: boolean;
    isBG: boolean;
    startTime: number;
    questionWord: IDictionaryItem;
    beforeQuestionWord: IDictionaryItem;
    toggleBG: () => void;
    setIsStart: (isStart: boolean) => void;
    setAnswers: (word: IDictionaryItem) => void;
    clearAnswers: () => void;
    setStartTime: (startTime: number) => void;
    setQuestionWord: () => void;// Write beforeWord to beforeQuestionWord and get a new word from LearningWords
    addLearnedWord: (word: IDictionaryItem) => void;
    setLearningWords: () => void;
}