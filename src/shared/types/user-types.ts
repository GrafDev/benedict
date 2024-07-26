import {TColorUI} from "./ui-types.ts";
import {IVocabulary} from "./vocabulary-types.ts";

export interface IUser {
    id: string;
    email: string|null;
    username: string|null;
    photoUrl: string|null;
    token: string;
    options: IUserOptions|null;
    data: IUserData|null;
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
    userVocabularies: IVocabulary[]
}

