import {IVocabulary} from "./vocabulary-types.ts";

export interface IUser {
    id: string;
    email: string|null;
    username: string|null;
    photoUrl: string|null;
    token: string;
    userRecord: number;
    currentVocabularyId: string;
    data: IUserData|null;
}


export interface IUserData {

    userVocabularies: IVocabulary[]
}

