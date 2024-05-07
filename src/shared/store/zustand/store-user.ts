import {create} from "zustand";
import {IDictionaryItem, IUser, IUserStore} from "../../types.ts";
import {defaultUser} from "../constants-store/default-user.ts";
import axios from "axios";
import {APPLICATION_ID, deleteCookie, getCookie, HOST_URL, REST_API_KEY} from "../../parse";
import {setCookie} from "../../parse";
import {defaultDictionary, defaultWord} from "../constants-store";
import {createQuestionWord} from "../../../features/common";
import {createLearningWords} from "../../../features/toGame";

export const useUser = create<IUserStore>((set, get) => ({
    currentUser: defaultUser,
    isAuth: false,
    loading: false,
    setIsEasyForm: () => {
        set({currentUser: {...get().currentUser, isEasyForm: !get().currentUser.isEasyForm}});
        get().updateUser()
    },
    setIsDarkTheme: (_isDarkTheme: boolean) => {
        set({currentUser: {...get().currentUser, isDarkTheme: _isDarkTheme}});
        get().updateUser()
    },
    setCurrentUser: (_currentUser: IUser) => {
        set({currentUser: _currentUser});
    },
    toggleBG: (_isBG: boolean) => {
        set({
            currentUser: {
                ...get().currentUser, isBG: _isBG,
            },
        });
        get().updateUser();
    },
    signUpUser: async (username: string, password: string): Promise<void> => {
        set({loading: true})
        await axios.post(
            `${HOST_URL}/users/`,
            {username, password},
            {
                headers: {
                    'X-Parse-Application-Id': APPLICATION_ID,
                    'X-Parse-REST-API-Key': REST_API_KEY,
                    'X-Parse-Revocable-Session': 1,
                    'Content-Type': 'application/json',
                },
            }
        ).then(response => {
            setCookie("BenedictUserToken", response.data.sessionToken, new Date(response.data.expirationTime));

            const _currentUser: IUser = {
                objectId: response.data.objectId,
                username,
                isBG: get().currentUser.isBG,
                isEasyForm:get().currentUser.isEasyForm,
                isDarkTheme: get().currentUser.isDarkTheme,
                isUserDictionary: get().currentUser.isUserDictionary,
                userDict: get().currentUser.userDict,
            }
            set({currentUser: _currentUser});
            set({isAuth: true});
        }).catch((error: any) => {
            console.error("Error signing up user:", error);
        }).finally(
            () => {
                set({loading: false})
            })
    },
    readingUser: async (): Promise<void> => {
        set({loading: true})
        await axios.get(`${HOST_URL}/users/${get().currentUser.objectId}`, {
            headers: {
                'X-Parse-Application-Id': APPLICATION_ID,
                'X-Parse-REST-API-Key': REST_API_KEY,
            },
        }).then(() => {

            set({currentUser: get().currentUser})
            set({isAuth: true});
        }).catch((error: any) => {
            console.log(error)
        }).finally(
            () => {
                set({loading: false})
            })
    },
    retrievingUser: async (): Promise<void> => {
        set({loading: true})
        const token: string | undefined = getCookie('BenedictUserToken')

        await axios.get(`${HOST_URL}/users/me`, {
            headers: {
                "X-Parse-Application-Id": APPLICATION_ID,
                "X-Parse-REST-API-Key": REST_API_KEY,
                "X-Parse-Session-Token": token,
            },
        }).then(response => {
            set({currentUser: response.data})
            set({isAuth: true});
        }).catch((error: any) => {
            console.log(error)
        }).finally(
            () => {
                set({loading: false})
                get().setCurrentDict()
            }
        )

    },
    logInUser: async (username: string, password: string): Promise<void> => {
        set({loading: true})
        await axios.post(`${HOST_URL}/login`, {username, password}, {
            headers: {
                'X-Parse-Application-Id': APPLICATION_ID,
                'X-Parse-REST-API-Key': REST_API_KEY,
                'X-Parse-Revocable-Session': 1,
            },
        }).then(response => {
            set({currentUser: response.data})
            setCookie('BenedictUserToken', response.data.sessionToken, new Date(response.data.expirationTime))
            set({isAuth: true});
        }).catch((error: any) => {
            console.log(error)
        }).finally(
            () => {
                set({loading: false})
                get().setCurrentDict()
            })
    },
    logOutUser: async (): Promise<void> => {
        set({loading: true})
        const token: string | undefined = getCookie('BenedictUserToken')
        await axios.post(`${HOST_URL}/logout`, {}, {
            headers: {
                "X-Parse-Application-Id": APPLICATION_ID,
                "X-Parse-REST-API-Key": REST_API_KEY,
                "X-Parse-Session-Token": token,
            },
        }).then(() => {
            set({currentUser: defaultUser})
            deleteCookie('BenedictUserToken')
            get().currentUser.isUserDictionary?get().setIsUserDictionary():null
            get().setCurrentDict()
            set({isAuth: false});
        }).catch((error: any) => {
            console.log(error)
        }).finally(
            () => {
                set({loading: false})
            })
    },
    updateUser: async (): Promise<void> => {
        const token: string | undefined = getCookie('BenedictUserToken')
        set({loading: true})
        const data = {
            "isBG": get().currentUser.isBG,
            "username": get().currentUser.username,
            "isEasyForm": get().currentUser.isEasyForm,
            "isDarkTheme": get().currentUser.isDarkTheme,
            "isUserDictionary": get().currentUser.isUserDictionary,
            "userDict": get().currentUser.userDict
        }

        await axios.put(`${HOST_URL}/users/${get().currentUser.objectId}`, data, {
            headers: {
                "X-Parse-Application-Id": APPLICATION_ID,
                "X-Parse-REST-API-Key": REST_API_KEY,
                "X-Parse-Session-Token": token,
            },
        }).then(() => {
        }).catch((error: any) => {
            console.log(error)
        }).finally(
            () => {
                set({loading: false})
            })
    },
    deleteUser: async (): Promise<void> => {
        set({loading: true})
        const token: string | undefined = getCookie('BenedictUserToken')
        await axios.delete(`${HOST_URL}/users/${get().currentUser.objectId}`, {
            headers: {
                "X-Parse-Application-Id": APPLICATION_ID,
                "X-Parse-REST-API-Key": REST_API_KEY,
                "X-Parse-Session-Token": token,
            },
        }).then(() => {
            set({currentUser: defaultUser})
            deleteCookie('BenedictUserToken')
            set({isAuth: false});
        }).catch((error: any) => {
            console.log(error)
        }).finally(
            () => {
                set({loading: false})
            })
    },

    //Dictionary fields
    currentDict: defaultDictionary,
    mainDict: defaultDictionary,
    setIsUserDictionary: () => {
        set({
            currentUser: {
                ...get().currentUser,
                isUserDictionary: !get().currentUser.isUserDictionary
            }
        });
        get().isAuth ? get().updateUser() : null
    },
    setCurrentDict: () => set({currentDict: get().currentUser.isUserDictionary ? get().currentUser.userDict : get().mainDict}),
    questionWord: defaultWord,
    previousQuestionWord: defaultWord,
    learningWords: [],
    isTranslate: false,
    lastTranslate: false,
    setPreviousQuestionWord: () => set({previousQuestionWord: get().questionWord}),
    setQuestionWord: () => set({
        questionWord: createQuestionWord(get().learningWords, get().currentDict, get().previousQuestionWord, get().questionWord),
        isTranslate: Math.random() < 0.5
    }),
    setLearningWords: () => {
        set({learningWords: createLearningWords(get().currentDict)})
    },
    shiftLearningWords: () => set({learningWords: get().learningWords.filter((word: IDictionaryItem) => word.id !== get().previousQuestionWord.id)}),
    clearLearningWords: () => set({learningWords: []}),
    changeQuestionWord: () => set({
        previousQuestionWord: get().questionWord,
        questionWord: createQuestionWord(get().learningWords, get().currentDict, get().previousQuestionWord, get().questionWord),
        lastTranslate: get().isTranslate,
        isTranslate: Math.random() < 0.5
    }),
    setWordToCurrentDict: (word: IDictionaryItem, index: number) => {
        set({currentDict: [...get().currentDict.slice(0, index), word, ...get().currentDict.slice(index + 1)]})
        get().updateUserDict()
    },
    addWordToCurrentDict: (word: IDictionaryItem) =>{
        set({currentDict: [...get().currentDict, word]}),
        get().updateUserDict()
    },
    deleteWordFromCurrentDict: (index: number) =>{
        set({currentDict: [...get().currentDict.slice(0, index), ...get().currentDict.slice(index + 1)]})
        get().updateUserDict()
    },
    updateUserDict: () => {
        set({currentUser: {...get().currentUser, userDict: get().currentDict}})
        get().updateUser()
    }


}))