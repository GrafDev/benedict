import {create} from "zustand";
import {IUser, IUserStore, IVocabulary, IVocabularyItem, TColorUI} from "../../types.ts";
import {defaultUser} from "../constants-store/default-user.ts";
import axios from "axios";
import {APPLICATION_ID, deleteCookie, getCookie, HOST_URL, REST_API_KEY} from "../../parse";
import {setCookie} from "../../parse";
import {createLearningWords} from "../../../features/toGame";
import {devtools} from "zustand/middleware";
import {en, de, ru, es, it, fr, pt, tr, ua, cz, pl, rs} from "../languages";
import {defaultWord} from "../constants-store";
import {createQuestionWord, readJsonLang} from "../../../features/common";

export const useUser = create<IUserStore>()(devtools((set, get) => ({
    currentUser: defaultUser,
    isAuth: false,
    loading: false,
    isLearning: false,
    setIsLearning: (_isLearning: boolean) => {
        set({isLearning: _isLearning}, false, "isLearning");
    },
    setLoading: (_loading: boolean) => {
        set({loading: _loading}, false, "loading");
    },
    isMistake: false,
    error: "",
    setError: (_error: string) => {
        set({error: _error}, false, "error");
    },
    setIsMistake: (_isMistake: boolean) => {
        set({isMistake: _isMistake}, false, "isMistake");
    },

    setUserRecord: (_userRecord: number) => {
        if ((get().currentUser.userRecord > _userRecord) || get().currentUser.userRecord === 0) {
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
                    currentVocabularyId: get().currentUser.currentVocabularyId,
                    userVocabularies: get().currentUser.userVocabularies,
                    colorUI: get().currentUser.colorUI,
                    userRecord: get().currentUser.userRecord,
                    language: get().currentUser.language,
                }
                set({currentUser: _currentUser}, false, "currentUser");
                set({isAuth: true}, false, "isAuth");
                set({error: ""}, false, "error");
            }).catch((error: any) => {
                console.error("Error signing up user:", error);
                set({error: error.response.data.error}, false, "error")
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
                    // TODO: необходимо дополнить setcurrentVocabulary так как было setCurrentDict
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
                set({error: ""}, false, "error");
            }).catch((error: any) => {
                console.log(error)
                set({error: error.response.data.error}, false, "error")
            }).finally(
                () => {
                    set({loading: false}, false, "loading")
                    // TODO: необходимо дополнить setcurrentVocabulary так как было setCurrentDict
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
                // TODO: необходимо дополнить setcurrentVocabulary так как было setCurrentDict
                set({isAuth: false}, false, "isAuth");
                set({error: ""}, false, "error");
            }).catch((error: any) => {
                console.log(error)
                set({error: error.response.data.error}, false, "error")
            }).finally(() =>
                set({loading: false}, false, "loading")
            )
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
                "currentVocabularyId": get().currentUser.currentVocabularyId,
                "userVocabularies": get().currentUser.userVocabularies,
                "colorUI": get().currentUser.colorUI,
                "userRecord": get().currentUser.userRecord,
                "language": get().currentUser.language,
            }
            if (get().isAuth) {
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
            }
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
                set({error: ""}, false, "error");
            }).catch((error: any) => {
                console.log(error)
                set({error: error.response.data.error}, false, "error")
            }).finally(() => {
                set({loading: false}, false, "loading")
            })
        },

    //Dictionary fields
    listVocabularies: [],
    currentVocabulary: <IVocabulary>{},
    setCurrentVocabulary: (_vocabulary: IVocabulary) => {
        set({currentVocabulary: _vocabulary}, false, "setCurrentVocabulary")
    },
    currentVocabularyIndex: 0,
    setCurrentVocabularyIndex: (_indexCurrentVocabulary: number) => {
        set({currentVocabularyIndex: _indexCurrentVocabulary}, false, "setIndexCurrentVocabulary")
    },
    setVocabularyName: (name: string) => {
        set({currentVocabulary: {...get().currentVocabulary, name: name}}, false, "setVocabularyName")
    },
    addVocabulary: (vocabulary: IVocabulary) => {
        for (let i = 0; i < get().listVocabularies.length; i++) {
            if (get().listVocabularies[i].id === vocabulary.id) {
                return
            }
        }
        set({listVocabularies: [...get().listVocabularies,  vocabulary]}, false, "addListVocabularies")
        set({currentVocabulary: vocabulary}, false, "setCurrentVocabulary")
        get().setCurrentVocabularyIndex(get().listVocabularies.length-1)

    },
    removeCurrentVocabulary: () => {
        const listVocabularies = [...get().listVocabularies]; // Создаем копию массива
        const currentVocabularyIndex = get().currentVocabularyIndex;

        console.log("current vocabulary before remove", listVocabularies,"\nIndex", currentVocabularyIndex);

        if (listVocabularies.length === 0) {
            console.log("No vocabularies to remove");
            return;
        }

        // Удаляем элемент из массива
        listVocabularies.splice(currentVocabularyIndex, 1);

        // Вычисляем новый индекс
        let newIndex = currentVocabularyIndex-1;
        // if (newIndex >= listVocabularies.length) {
        //     newIndex = Math.max(0, listVocabularies.length - 1);
        // }

        console.log("After removal:", newIndex, listVocabularies);

        set({ listVocabularies }, false, "removeListVocabularies");
        set({ currentVocabularyIndex: newIndex }, false, "setIndexCurrentVocabulary");
        set({ currentVocabulary: listVocabularies[newIndex] || null }, false, "setCurrentVocabulary");

    },
    dict2500: [],
    setDict2500: async () => {
        await axios.get('https://parsefiles.back4app.com/IQbWsGjOUYF0zHuJDWJQJM5hsRhao1BemVSiqQCJ/a72e0c9c1fe080943f6c2362c68686d8_output2500.json')
            .then(res => {
                    set({dict2500: res.data}, false, "dict2500")
                }
            )
            .catch((error: any) => {
                console.log(error)
            }).finally(() => {
            })
    },

// User fields
    learningWords: [],
    questionWord: defaultWord,
    previousQuestionWord: defaultWord,
    isTranslate: false,
    lastTranslate: false,
    setPreviousQuestionWord:
        () => set({previousQuestionWord: get().questionWord}),
    setQuestionWord:
        () => set({
            questionWord: createQuestionWord(get().learningWords, get().previousQuestionWord, get().questionWord),
            isTranslate: Math.random() < 0.5
        }, false, "questionWord,isTranslate"),
    setLearningWords:
        () => {
            set({learningWords: createLearningWords(get().currentVocabulary.vocabulary, get().listVocabularies[0].vocabulary)}, false, "learningWords -" +
                " setLearningWords")
        },
    shiftLearningWords:
        () => {
            set({
                learningWords: get().learningWords.filter(
                    (word: IVocabularyItem) => word.mean !== get().previousQuestionWord.mean)
            }, false, "learningWords- shiftLearningWords")
        },
    clearLearningWords:
        () => set({learningWords: []}, false, "learningWords - clearLearningWords"),
    changeQuestionWord:
        () => {
            set({
                previousQuestionWord: get().questionWord,
                questionWord: createQuestionWord(get().learningWords, get().previousQuestionWord, get().questionWord),
                lastTranslate: get().isTranslate,
                isTranslate: Math.random() < 0.5
            }, false, "previousQuestionWord,questionWord,lastTranslate,isTranslate")
        },
    setWordToCurrentVocabulary:
        (word: IVocabularyItem, index: number) => {
            set({
                currentVocabulary: {
                    ...get().currentVocabulary,
                    vocabulary: [...get().currentVocabulary.vocabulary.slice(0, index), word, ...get().currentVocabulary.vocabulary.slice(index + 1)]
                }
            }, false, "currentDict"),
                get().updateUserVocabulary()
        },

    addWordToCurrentVocabulary: (word: IVocabularyItem) => {
        set({
            currentVocabulary: {
                ...get().currentVocabulary,
                vocabulary: [...get().currentVocabulary.vocabulary, word]
            }
        }, false, "currentDict"),
            console.log("addVocabulary", get().currentVocabulary.vocabulary)
        get().updateCurrentVocabularyInVocabularies()
        get().updateUserVocabulary()
    },
    addWordsToCurrentVocabulary: (words: IVocabularyItem[]) => {
        set({
            currentVocabulary: {
                ...get().currentVocabulary,
                vocabulary: [...get().currentVocabulary.vocabulary, ...words]
            }
        }, false, "currentDict"),
            console.log("addVocabulary", get().currentVocabulary.vocabulary)
        get().updateCurrentVocabularyInVocabularies()
        get().updateUserVocabulary()
    },
    updateCurrentVocabularyInVocabularies: () => {
        for (let i = 0; i < get().listVocabularies.length; i++) {
            if (get().listVocabularies[i].id === get().currentVocabulary.id) {
                get().listVocabularies[i] = get().currentVocabulary
            }
        }
    },
    deleteWordFromCurrentVocabulary:
        (index: number) => {
            set({
                currentVocabulary: {
                    ...get().currentVocabulary,
                    vocabulary: [...get().currentVocabulary.vocabulary.slice(0, index), ...get().currentVocabulary.vocabulary.slice(index + 1)]
                }
            }, false, "currentDict")
            get().updateUserVocabulary()
        },
    updateUserVocabulary:
        () => {
            set({
                currentUser: {
                    ...get().currentUser,
                    currentVocabularyId: get().currentVocabulary.id,
                    userVocabularies: {
                        ...get().currentUser.userVocabularies,
                        [get().currentVocabulary.id]: get().currentVocabulary
                    }
                }
            }, false, "currentUser")
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
    translations: {
        en: readJsonLang(en), // Переводы для английского
        rs: readJsonLang(rs), // Переводы для сербского
        ua: readJsonLang(ua),// Переводы для украинского
        pl: readJsonLang(pl),// Переводы для польского
        de: readJsonLang(de), // Переводы для немецкого
        fr: readJsonLang(fr),// Переводы для французского
        es: readJsonLang(es),// Переводы для испанского
        it: readJsonLang(it), // Переводы для итальянского
        pt: readJsonLang(pt), // Переводы для португальского
        cz: readJsonLang(cz),// Переводы для чешского
        ru: readJsonLang(ru), // Переводы для русского
        tr: readJsonLang(tr), // Переводы для турецкого
    },
    setLanguage: (newLanguage) => {
        set({currentUser: {...get().currentUser, language: newLanguage}}, false, "currentUser-language")
        get().updateUser()
    },

}), {name: "UserSet"}))
