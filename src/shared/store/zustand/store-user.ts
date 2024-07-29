import {create} from "zustand";
import {DEFAULT_USER, DEFAULT_VOCABULARY} from "../../constants";
import axios from "axios";
import {createLearningWords} from "../../../features/toGame";
import {devtools} from "zustand/middleware";
import {DEFAULT_WORD} from "../../constants";
import {createQuestionWord} from "../../../features/common";
import {IUser} from "../../types/user-types.ts";

import {IVocabulary, IVocabularyItem} from "../../types/vocabulary-types.ts";
import {getDatabase, ref, set as setDB, get as getDB, Database} from 'firebase/database';


export interface IUserStore {
    currentUser: IUser;
    setCurrentUser: (_user: IUser) => void;
    removeCurrentUser: () => void;

    listVocabularies: IVocabulary[];
    cleanListVocabularies: () => void
    currentVocabulary: IVocabulary;
    setCurrentVocabulary: (_vocabulary: IVocabulary) => void;

    isLoading: boolean;
    setIsLoading: (_isLoading: boolean) => void;
    currentVocabularyIndex: number;
    setCurrentVocabularyIndex: (_indexCurrentVocabulary: number) => void;
    setVocabularyName: (name: string) => void
    addVocabulary: (list: IVocabulary) => void
    removeCurrentVocabulary: () => void
    dict2500: IVocabularyItem[]
    setDict2500: () => void

    learningWords: IVocabularyItem[];
    questionWord: IVocabularyItem;
    previousQuestionWord: IVocabularyItem;
    isTranslate: boolean;
    lastTranslate: boolean;
    setPreviousQuestionWord: () => void;
    setQuestionWord: () => void;
    setLearningWords: () => void;
    shiftLearningWords: () => void;
    clearLearningWords: () => void;
    changeQuestionWord: () => void;
    setWordToCurrentVocabulary: (word: IVocabularyItem, index: number) => void;
    addWordToCurrentVocabulary: (word: IVocabularyItem) => void;
    editWordInCurrentVocabulary: (word: IVocabularyItem, index: number) => void
    addWordsToCurrentVocabulary: (words: IVocabularyItem[]) => void
    deleteWordFromCurrentVocabulary: (index: number) => void;
    updateCurrentVocabularyInVocabularies: () => void

    saveVocabulariesToServer: () => void
    loadVocabulariesFromServer: () => void

}

export const useUserStore = create<IUserStore>()(devtools((set, get) => ({
    //User fields
    currentUser: DEFAULT_USER,
    setCurrentUser(_user: IUser) {
        console.log("set user", _user)
        set({currentUser: _user}, false, "setUser")
    },

    removeCurrentUser: () => {
        set({currentUser: DEFAULT_USER}, false, "removeUser")
    },


    //Dictionary fields
    isLoading: true,
    setIsLoading: (_isLoading: boolean) => {
        set({isLoading: _isLoading}, false, "setIsLoading")
    },
    listVocabularies: [],
    cleanListVocabularies: () => {
        set({listVocabularies: [DEFAULT_VOCABULARY]}, false, "cleanListVocabularies")
    },
    currentVocabulary: <IVocabulary>{},
    setCurrentVocabulary: (_vocabulary: IVocabulary) => {
        set({currentVocabulary: _vocabulary}, false, "setCurrentVocabulary")
    },

    currentVocabularyIndex: 0,
    setCurrentVocabularyIndex: (_indexCurrentVocabulary: number) => {
        set({currentVocabularyIndex: _indexCurrentVocabulary}, false, "setIndexCurrentVocabulary")
        const _currentVocabulary = get().listVocabularies[_indexCurrentVocabulary]
        get().setCurrentVocabulary(_currentVocabulary)
    },
    setVocabularyName: (name: string) => {
        set({currentVocabulary: {...get().currentVocabulary, name: name}}, false, "setVocabularyName")
        get().updateCurrentVocabularyInVocabularies()
    },
    addVocabulary: (vocabulary: IVocabulary) => {
        for (let i = 0; i < get().listVocabularies.length; i++) {
            if (get().listVocabularies[i].id === vocabulary.id) {
                return
            }
        }
        set({listVocabularies: [...get().listVocabularies, vocabulary]}, false, "addListVocabularies")
        get().setCurrentVocabulary(vocabulary)
        get().setCurrentVocabularyIndex(get().listVocabularies.length - 1)
        get().updateCurrentVocabularyInVocabularies()
        console.log("added vocabulary", get().listVocabularies)
    },
    removeCurrentVocabulary: () => {
        const listVocabularies = [...get().listVocabularies]; // Создаем копию массива
        const currentVocabularyIndex = get().currentVocabularyIndex;
        console.log("current vocabulary before remove", listVocabularies, "\nIndex", currentVocabularyIndex);
        if (listVocabularies.length === 0) {
            console.log("No vocabularies to remove");
            return;
        }
        listVocabularies.splice(currentVocabularyIndex, 1);
        let newIndex = currentVocabularyIndex - 1;
        console.log("After removal:", newIndex, listVocabularies);
        set({listVocabularies}, false, "removeListVocabularies");
        set({currentVocabularyIndex: newIndex}, false, "setIndexCurrentVocabulary");
        set({currentVocabulary: listVocabularies[newIndex] || null}, false, "setCurrentVocabulary");
        get().updateCurrentVocabularyInVocabularies()
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

//Game fields
    learningWords: [],
    questionWord: DEFAULT_WORD,
    previousQuestionWord: DEFAULT_WORD,
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
            }, false, "currentDict")
            get().updateCurrentVocabularyInVocabularies()
        },
    addWordToCurrentVocabulary: (word: IVocabularyItem) => {
        const currentVocabulary = get().currentVocabulary.vocabulary;
        if (!currentVocabulary.some(item => item.mean === word.mean)) {
            set({
                currentVocabulary: {
                    ...get().currentVocabulary,
                    vocabulary: [...currentVocabulary, word]
                }
            }, false, "currentDict");
            console.log("addVocabulary", get().currentVocabulary.vocabulary);
            get().updateCurrentVocabularyInVocabularies();
        } else {
            console.log("Word already exists in the vocabulary:", word.mean);
        }
        get().updateCurrentVocabularyInVocabularies()
    },
    editWordInCurrentVocabulary: (word: IVocabularyItem, index: number) => {
        set({
            currentVocabulary: {
                ...get().currentVocabulary,
                vocabulary: [...get().currentVocabulary.vocabulary.slice(0, index), word, ...get().currentVocabulary.vocabulary.slice(index + 1)]
            }
        }, false, "currentDict")
        get().updateCurrentVocabularyInVocabularies();

    },
    addWordsToCurrentVocabulary: (words: IVocabularyItem[]) => {
        words.forEach(word => {
            get().addWordToCurrentVocabulary(word);
        });
        get().updateCurrentVocabularyInVocabularies();
    },


    deleteWordFromCurrentVocabulary: (index: number) => {
        set((state) => {
            const updatedVocabulary = [...state.currentVocabulary.vocabulary];
            updatedVocabulary.splice(index, 1); // Удаление элемента по индексу
            console.log("deleteWordFromCurrentVocabulary", updatedVocabulary);
            return {
                currentVocabulary: {
                    ...state.currentVocabulary,
                    vocabulary: updatedVocabulary,
                },
            };
        });
        get().updateCurrentVocabularyInVocabularies()
    },
    updateCurrentVocabularyInVocabularies: () => {
        for (let i = 0; i < get().listVocabularies.length; i++) {
            if (get().listVocabularies[i].id === get().currentVocabulary.id) {
                get().listVocabularies[i] = get().currentVocabulary
            }
        }
    },
    saveVocabulariesToServer: (): void => {
        if (!get().currentUser.email) {
            console.log("saveVocabulariesToServer", get().listVocabularies);
            return
        }
        const db: Database = getDatabase();

        const filteredVocabularies = get().listVocabularies.filter(vocabulary => vocabulary.id !== "default");


        const userId: string = get().currentUser.id;

        const dbRef = ref(db, `users/${userId}/vocabularies`);
        setDB(dbRef, filteredVocabularies)
            .then(() => {
                console.log("Data saved successfully");
            })
            .catch((error) => {
                console.error("Error saving data:", error);
                // Обработка конкретных ошибок, например:
                if (error.code === 'PERMISSION_DENIED') {
                    console.error('User does not have permission to write to this location.');
                }
            });
        console.log("saveVocabulariesToServer-3", get().listVocabularies);
    },
    loadVocabulariesFromServer: () => {
        // get().addVocabulary(LINGVO_VOCABULARY)

        console.log("loadVocabulariesFromServer2", get().listVocabularies);
        const db: Database = getDatabase();
        const userId: string = get().currentUser.id;
        const dbRef = ref(db, `users/${userId}/vocabularies`);
        getDB(dbRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const vocabularies = snapshot.val();
                    console.log(vocabularies);
                    for (const vocabulary of vocabularies) {
                        get().addVocabulary(vocabulary)
                    }
                    // Здесь вы можете использовать полученные данные
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
        console.log("loadVocabulariesFromServer3", get().listVocabularies);
    },
}), {name: "UserSet"}))
