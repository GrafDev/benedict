import {TColorUI} from "./ui-types.ts";
import {IVocabulary} from "./vocabulary-types.ts";

export interface IUser {
    id: string;
    email: string;
    username: string;
    token: string;
    options: IUserOptions;
    data: IUserData;
}

export interface IUserOptions {
    isBG: boolean;
    isDarkTheme: boolean;
    colorUI:TColorUI,
    userRecord: number;
    language: string;
}

export interface IUserData {
    currentVocabularyId: string;
    userVocabularies: IVocabulary[];
}

