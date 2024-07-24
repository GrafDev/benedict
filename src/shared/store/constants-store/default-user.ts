import {IUser} from "../../types/user-types.ts";

export const defaultUser: IUser = {
    id: '0',
    email: '',
    username: 'Guest',
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