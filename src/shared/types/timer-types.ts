

export type TUserOptions = "SignIn" | "SignUp"  | "Edit" | "Exit";

export type TModalOptions = "addWord" | "addVocabulary" | "clearVocabulary" | "removeVocabulary" | "editWord" | "renameVocabulary"|"copyWords"|"saveVocabulary"|""

export interface ITimerStore {
    startTime: number;
    elapsedTime: number;
    setStartTime: () => void;
    getStartTime: () => number;
}


