import { IUser} from "../../types.ts";

export const defaultUser: IUser = {
    objectId: '0',
    username: 'Guest',
    isBG:false,
    isEasyForm: true,
    isDarkTheme: true,
    currentVocabularyId: '0',
    userVocabularies: [],
    colorUI: 'gray',
    userRecord: 0,
    language: 'en',
}