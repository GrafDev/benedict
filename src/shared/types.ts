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

export interface IDictForm extends Omit<IDictionaryItem, "id" & "popular" & "learning"> {

}

export type TUserOptions = "SignIn" | "SignUp" | "Edit" | "Exit";


export interface IUser {
    objectId: string;
    username: string;
    isBG: boolean;
    isDarkTheme: boolean;
    isUserDictionary: boolean;
    userDict: IDictionaryItem[];
}

export interface ITimerStore {
    startTime: number;
    elapsedTime: number;
    setStartTime: () => void;
    getStartTime: () => number;
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


export interface IDictModalStore {
    editWord: IDictionaryItem;
    indexEditWord: number;
    setEditWord: (editWord: IDictionaryItem, indexEditWord: number) => void
}

export interface IUserStore {
    currentUser: IUser;
    isAuth: boolean;
    loading: boolean;
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

    currentDict: IDictionaryItem[];
    mainDict: IDictionaryItem[];
    setCurrentDict: () => void;
    setIsUserDictionary: () => void;
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
    updateUserDict: () => void
}