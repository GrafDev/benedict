import {IVocabulary} from "./vocabulary-types.ts";

export interface IUser {
    id: string;
    email: string|null;
    username: string|null;
    photoUrl: string|null;
    token: string;
    userRecord: number;
}


export interface IUserData {

    userVocabularies: IVocabulary[]
}

