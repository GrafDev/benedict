
export interface IVocabularyItem{
    id: string;
    mean: string;
    translate: string;
    learning: number;
    popular: number;
}

export type TUserOptions = "SignIn" | "SignUp"  | "Edit" | "Exit";

export type TColorUI ="gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "cyan" | "purple" | "pink"

export interface IUser {
    objectId: string;
    username: string;
    isBG: boolean;
    isEasyForm: boolean;
    isDarkTheme: boolean;
    currentVocabularyId: string;
    userVocabularies: IVocabulary[];
    colorUI:TColorUI,
    userRecord: number;
    language: string;
}

export interface IVocabulary {
    id: string;
    name: string;
    vocabulary: IVocabularyItem[]
}
export interface IListVocabularies {
    [key: string]: IVocabulary
}


export interface ITimerStore {
    startTime: number;
    elapsedTime: number;
    setStartTime: () => void;
    getStartTime: () => number;
}
export interface ILangStore {
    language: string;
    translations: { [key: string]: any };
    setLanguage: (newLanguage: string) => void;
}

export interface ICommonStore {
    isStart: boolean;
    showStartPage: boolean;
    setShowStartPage: (showStartPage: boolean) => void;
    mistakes: number;
    isCongratulations: boolean;
    addMistakes: () => void;
    clearMistakes: () => void;
    setIsStart: (isStart: boolean) => void;
    setIsCongratulations: (isCongratulations: boolean) => void;

}

export interface IUIStore {
    linkBG: string;
    setLinkBG: (BG: string[]) => void;
    mainColor: { dark: string, light: string };
    backgroundColor: { dark: string, light: string };

}


export interface IVocabularyModalStore {
    editWord: IVocabularyItem;
    indexEditWord: number;
    setEditWord: (editWord: IVocabularyItem, indexEditWord: number) => void
}


export interface IUserStore {
    currentUser: IUser;
    isAuth: boolean;
    loading: boolean;
    isLearning: boolean;
    setIsLearning: (isLearning: boolean) => void;
    setLoading: (loading: boolean) => void;
    isMistake: boolean;
    error: string;
    setError: (error: string) => void;
    setIsMistake: (_isMistake: boolean) => void;
    setUserRecord: (_userRecord: number) => void;

    setIsEasyForm: () => void;
    setIsDarkTheme: (isDarkTheme: boolean) => void;
    setCurrentUser: (currentUser: IUser) => void;
    toggleBG: (_isBG: boolean) => void;
    signUpUser: (username: string, password: string) => void;
    readingUser: () => void
    retrievingUser: () => void
    logInUser: (username: string, password: string) => void
    logOutUser: () => void
    updateUser: () => void
    deleteUser: () => void

    currentVocabulary: IVocabulary;
    setCurrentVocabulary: (_vocabulary: IVocabulary) => void;
    listVocabularies: IListVocabularies;
    addVocabulary: (list: IVocabulary) => void
    removeVocabulary: (id: string) => void
    dict2500: IVocabularyItem[]
    setDict2500: () => void

    questionWord: IVocabularyItem;
    previousQuestionWord: IVocabularyItem;
    learningWords: IVocabularyItem[];
    isTranslate: boolean;
    lastTranslate: boolean;
    setPreviousQuestionWord: () => void;
    setQuestionWord: () => void;
    setLearningWords: () => void;
    shiftLearningWords: () => void;
    clearLearningWords: () => void;
    changeQuestionWord: () => void;
    setWordToCurrentVocabulary: (word: IVocabularyItem, index: number) => void;
    addWordToCurrentVocabulary: (word: IVocabularyItem) => void;
    deleteWordFromCurrentVocabulary: (index: number) => void;
    updateUserVocabulary: () => void
    setColorUI: (colorUI: TColorUI) => void

    translations: { [key: string]: any };
    setLanguage: (language: string) => void

}