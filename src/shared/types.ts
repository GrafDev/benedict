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

export interface IDictForm extends Omit<IDictionaryItem, "id" & "popular" & "learning">{

}
export type TUserOptions = "SignIn" | "SignUp" | "Save";


export interface IUser {
    id: string;
    name: string;
    email: string;
}

export interface IDictionaryStore {
    currentDict: IDictionaryItem[];
    mainDict: IDictionaryItem[];
    questionWord: IDictionaryItem;
    previousQuestionWord: IDictionaryItem;
    learningWords: IDictionaryItem[];
    isTranslate: boolean;
    lastTranslate: boolean;
    setPreviousQuestionWord: () => void;
    setQuestionWord: () => void;
    setLearningWords: () => void;
    shiftLearningWords: () => void;
    clearLearningWords: () => void;
    changeQuestionWord: () => void;
    setWordToCurrentDict: (word: IDictionaryItem, index: number) => void;
    addWordToCurrentDict: (word: IDictionaryItem) => void;
    deleteWordFromCurrentDict: (index: number) => void;
}

export interface ITimerStore {
    startTime: number;
    elapsedTime: number;
    setStartTime: () => void;
    getStartTime: () => number;
}

export interface ICommonStore {
    isStart: boolean;
    mistakes: number;
    isCongratulations: boolean;
    addMistakes: () => void;
    clearMistakes: () => void;
    setIsStart: (isStart: boolean) => void;
    setIsCongratulations: (isCongratulations: boolean) => void;

}

export interface IUIStore {
    toggleBG: () => void;
    isBG: boolean;
    linkBG: string;
    setLinkBG: (BG: string[]) => void;
    mainColor: {dark: string, light: string};
    backgroundColor: {dark: string, light: string};
}



export interface IDictModalStore {
    editWord: IDictionaryItem;
    indexEditWord: number;
    setEditWord: (editWord: IDictionaryItem, indexEditWord: number) => void
}

export interface IUserStore  {
    currentUser: IUser | undefined;
    setCurrentUser: (currentUser: IUser ) => void;
}