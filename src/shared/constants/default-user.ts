import {IUser} from "../types/user-types.ts";

export const DEFAULT_USER: IUser = {
    id: '0',
    email: '',
    username: 'Guest',
    photoUrl: '',
    token: '',
    userRecord: 0,
    data: {
        currentVocabularyId: '0',
        userVocabularies: [],
    }

}