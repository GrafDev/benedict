import {IUser} from "../types/user-types.ts";

export const DEFAULT_USER: IUser = {
    id: '0',
    email: '',
    username: 'Guest',
    photoUrl: '',
    token: '',
    options: {
        isBG: false,
        isDarkTheme: true,
        colorUI: 'gray',
        userRecord: 0,
        language: 'en',
    },
    data: {
        currentVocabularyId: '0',
        userVocabularies: [],
    }

}