import {create} from "zustand";
import {IDictionaryItem, IUser, IUserStore, TColorUI} from "../../types.ts";
import {defaultUser} from "../constants-store/default-user.ts";
import axios from "axios";
import {APPLICATION_ID, deleteCookie, getCookie, HOST_URL, REST_API_KEY} from "../../parse";
import {setCookie} from "../../parse";
import {defaultDictionary, defaultWord} from "../constants-store";
import {createQuestionWord} from "../../../features/common";
import {createLearningWords} from "../../../features/toGame";
import {devtools} from "zustand/middleware";

export const useUser = create<IUserStore>()(devtools((set, get) => ({
    currentUser: defaultUser,
    isAuth: false,
    loading: false,
    isMistake: false,
    setIsMistake: (_isMistake: boolean) => {
        set({isMistake: _isMistake}, false, "isMistake");
    },

    setUserRecord: (_userRecord: number) => {
        if (get().currentUser.userRecord > _userRecord || get().currentUser.userRecord === 0) {
            set({currentUser: {...get().currentUser, userRecord: _userRecord}}, false, "currentUser-userRecord");
            get().updateUser()
        }
    },
    setIsEasyForm: () => {
        set({currentUser: {...get().currentUser, isEasyForm: !get().currentUser.isEasyForm}}, false, "currentUser");
        get().updateUser()
    },
    setIsDarkTheme:
        (_isDarkTheme: boolean) => {
            set({currentUser: {...get().currentUser, isDarkTheme: _isDarkTheme}}, false, "currentUser");
            get().updateUser()
        },
    setCurrentUser:
        (_currentUser: IUser) => {
            set({currentUser: _currentUser}, false, "currentUser");
        },
    toggleBG:
        (_isBG: boolean) => {
            set({
                currentUser: {
                    ...get().currentUser, isBG: _isBG,
                },
            }, false, "currentUser");
            get().updateUser();
        },
    signUpUser:
        async (username: string, password: string): Promise<void> => {
            set({loading: true}, false, "loading")
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
                    isEasyForm: get().currentUser.isEasyForm,
                    isDarkTheme: get().currentUser.isDarkTheme,
                    isUserDictionary: get().currentUser.isUserDictionary,
                    userDict: get().currentUser.userDict,
                    colorUI: get().currentUser.colorUI,
                    userRecord: get().currentUser.userRecord,
                }
                set({currentUser: _currentUser}, false, "currentUser");
                set({isAuth: true}, false, "isAuth");
            }).catch((error: any) => {
                console.error("Error signing up user:", error);
            }).finally(
                () => {
                    set({loading: false}, false, "loading")
                })
        },
    readingUser:
        async (): Promise<void> => {
            set({loading: true}, false, "loading")
            await axios.get(`${HOST_URL}/users/${get().currentUser.objectId}`, {
                headers: {
                    'X-Parse-Application-Id': APPLICATION_ID,
                    'X-Parse-REST-API-Key': REST_API_KEY,
                },
            }).then(() => {

                set({currentUser: get().currentUser}, false, "currentUser");
                set({isAuth: true}, false, "isAuth");
            }).catch((error: any) => {
                console.log(error)
            }).finally(
                () => {
                    set({loading: false}, false, "loading")
                })
        },
    retrievingUser:
        async (): Promise<void> => {
            set({loading: true}, false, "loading")
            const token: string | undefined = getCookie('BenedictUserToken')

            await axios.get(`${HOST_URL}/users/me`, {
                headers: {
                    "X-Parse-Application-Id": APPLICATION_ID,
                    "X-Parse-REST-API-Key": REST_API_KEY,
                    "X-Parse-Session-Token": token,
                },
            }).then(response => {
                set({currentUser: response.data}, false, "currentUser");
                set({isAuth: true}, false, "isAuth");
            }).catch((error: any) => {
                console.log(error)
            }).finally(
                () => {
                    set({loading: false}, false, "loading")
                    get().setCurrentDict()
                }
            )

        },
    logInUser:
        async (username: string, password: string): Promise<void> => {
            set({loading: true}, false, "loading")
            await axios.post(`${HOST_URL}/login`, {username, password}, {
                headers: {
                    'X-Parse-Application-Id': APPLICATION_ID,
                    'X-Parse-REST-API-Key': REST_API_KEY,
                    'X-Parse-Revocable-Session': 1,
                },
            }).then(response => {
                set({currentUser: response.data}, false, "currentUser");
                setCookie('BenedictUserToken', response.data.sessionToken, new Date(response.data.expirationTime))
                set({isAuth: true}, false, "isAuth");
            }).catch((error: any) => {
                console.log(error)
            }).finally(
                () => {
                    set({loading: false}, false, "loading")
                    get().setCurrentDict()
                })
        },
    logOutUser:
        async (): Promise<void> => {
            set({loading: true})
            const token: string | undefined = getCookie('BenedictUserToken')
            await axios.post(`${HOST_URL}/logout`, {}, {
                headers: {
                    "X-Parse-Application-Id": APPLICATION_ID,
                    "X-Parse-REST-API-Key": REST_API_KEY,
                    "X-Parse-Session-Token": token,
                },
            }).then(() => {
                set({currentUser: defaultUser}, false, "currentUser");
                deleteCookie('BenedictUserToken')
                get().currentUser.isUserDictionary ? get().setIsUserDictionary() : null
                get().setCurrentDict()
                set({isAuth: false}, false, "isAuth");
            }).catch((error: any) => {
                console.log(error)
            }).finally(
                () => {
                    set({loading: false}, false, "loading")
                })
        },
    updateUser:
        async (): Promise<void> => {
            const token: string | undefined = getCookie('BenedictUserToken')
            set({loading: true}, false, "loading")
            const data = {
                "isBG": get().currentUser.isBG,
                "username": get().currentUser.username,
                "isEasyForm": get().currentUser.isEasyForm,
                "isDarkTheme": get().currentUser.isDarkTheme,
                "isUserDictionary": get().currentUser.isUserDictionary,
                "userDict": get().currentUser.userDict,
                "colorUI": get().currentUser.colorUI,
                "userRecord": get().currentUser.userRecord,
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
                    set({loading: false}, false, "loading")
                })
        },
    deleteUser:
        async (): Promise<void> => {
            set({loading: true}, false, "loading")
            const token: string | undefined = getCookie('BenedictUserToken')
            await axios.delete(`${HOST_URL}/users/${get().currentUser.objectId}`, {
                headers: {
                    "X-Parse-Application-Id": APPLICATION_ID,
                    "X-Parse-REST-API-Key": REST_API_KEY,
                    "X-Parse-Session-Token": token,
                },
            }).then(() => {
                set({currentUser: defaultUser}, false, "currentUser")
                deleteCookie('BenedictUserToken')
                set({isAuth: false}, false, "isAuth");
            }).catch((error: any) => {
                console.log(error)
            }).finally(
                () => {
                    set({loading: false}, false, "loading")
                })
        },

    //Dictionary fields
    currentDict:
    defaultDictionary,
    mainDict:
    defaultDictionary,
    setIsUserDictionary:
        () => {
            set({
                currentUser: {
                    ...get().currentUser,
                    isUserDictionary: !get().currentUser.isUserDictionary
                }
            }, false, "currentUser");
            get().isAuth ? get().updateUser() : null
        },
    clearUserDict:
        () => {
            set({
                    currentUser: {
                        ...get().currentUser,
                        userDict: []
                    }
                }, false, "currentUser-userDict"
            ),
                set({currentDict: []}, false, "currentDict")
            get().updateUser()
        },

    setCurrentDict:
        () => set({currentDict: get().currentUser.isUserDictionary ? get().currentUser.userDict : get().mainDict}, false, "currentDict"),
    questionWord:
    defaultWord,
    previousQuestionWord:
    defaultWord,
    learningWords:
        [],
    isTranslate:
        false,
    lastTranslate:
        false,
    setPreviousQuestionWord:
        () => set({previousQuestionWord: get().questionWord}),
    setQuestionWord:
        () => set({
            questionWord: createQuestionWord(get().learningWords, get().currentDict, get().previousQuestionWord, get().questionWord),
            isTranslate: Math.random() < 0.5
        }, false, "questionWord,isTranslate"),
    setLearningWords:
        () => {
            set({learningWords: createLearningWords(get().currentDict, get().mainDict)}, false, "learningWords -" +
                " setLearningWords")
        },
    shiftLearningWords:
        () => {
            set({
                learningWords: get().learningWords.filter(
                    (word: IDictionaryItem) => word.id !== get().previousQuestionWord.id)
            }, false, "learningWords- shiftLearningWords")
        },
    clearLearningWords:
        () => set({learningWords: []}, false, "learningWords - clearLearningWords"),
    changeQuestionWord:
        () => set({
            previousQuestionWord: get().questionWord,
            questionWord: createQuestionWord(get().learningWords, get().currentDict, get().previousQuestionWord, get().questionWord),
            lastTranslate: get().isTranslate,
            isTranslate: Math.random() < 0.5
        }, false, "previousQuestionWord,questionWord,lastTranslate,isTranslate"),
    setWordToCurrentDict:
        (word: IDictionaryItem, index: number) => {
            set({currentDict: [...get().currentDict.slice(0, index), word, ...get().currentDict.slice(index + 1)]}, false, "currentDict"),
                get().updateUserDict()
        },
    addWordToCurrentDict:
        (word: IDictionaryItem) => {
            set({currentDict: [...get().currentDict, word]}, false, "currentDict"),
                get().updateUserDict()
        },
    deleteWordFromCurrentDict:
        (index: number) => {
            set({currentDict: [...get().currentDict.slice(0, index), ...get().currentDict.slice(index + 1)]}, false, "currentDict")
            get().updateUserDict()
        },
    updateUserDict:
        () => {
            set({currentUser: {...get().currentUser, userDict: get().currentDict}}, false, "currentUser")
            get().updateUser()
        },

    // UI
    setColorUI:
        (_colorUI: TColorUI) => {
        set({
            currentUser: {
                ...get().currentUser,
                colorUI: _colorUI,
            }

        }, false, "currentUser-colorUI")
            get().updateUser()
        },

}), {name: "User Set"}))