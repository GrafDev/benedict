import {create} from "zustand";
import {defaultUser} from "../constants-store/default-user.ts";
import axios from "axios";
import {createLearningWords} from "../../../features/toGame";
import {devtools} from "zustand/middleware";
import {defaultWord} from "../constants-store";
import {createQuestionWord} from "../../../features/common";
import {IUser} from "../../types/user-types.ts";
import {IVocabulary, IVocabularyItem} from "../../types/vocabulary-types.ts";


export interface IUserStore {
    currentUser: IUser;
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;

    listVocabularies: IVocabulary[];

    currentVocabulary: IVocabulary;
    setCurrentVocabulary: (_vocabulary: IVocabulary) => void;

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
    updateUserVocabulary: () => void

}

export const useUser = create<IUserStore>()(devtools((set, get) => ({
    //User fields
    isAuth: false,
    setIsAuth: (_isAuth: boolean) => {
        set({isAuth: _isAuth}, false, "isAuth");
    },
    currentUser: defaultUser,
    setUser(_user: IUser) {
        set({currentUser: _user}, false, "setUser")
    },
    removeUser: () => {
        set({currentUser: defaultUser}, false, "removeUser")
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
        const _currentVocabulary = get().listVocabularies[_indexCurrentVocabulary]
        get().setCurrentVocabulary(_currentVocabulary)
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
        set({listVocabularies: [...get().listVocabularies, vocabulary]}, false, "addListVocabularies")
        get().setCurrentVocabulary(vocabulary)
        get().setCurrentVocabularyIndex(get().listVocabularies.length - 1)
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
            get().updateUserVocabulary();
        } else {
            console.log("Word already exists in the vocabulary:", word.mean);
        }
    },
    editWordInCurrentVocabulary: (word: IVocabularyItem, index: number) => {
        set({
            currentVocabulary: {
                ...get().currentVocabulary,
                vocabulary: [...get().currentVocabulary.vocabulary.slice(0, index), word, ...get().currentVocabulary.vocabulary.slice(index + 1)]
            }
        }, false, "currentDict")
        get().updateUserVocabulary()
        get().updateCurrentVocabularyInVocabularies();

    },
    addWordsToCurrentVocabulary: (words: IVocabularyItem[]) => {
        words.forEach(word => {
            get().addWordToCurrentVocabulary(word);
        });
    },

    updateCurrentVocabularyInVocabularies: () => {
        for (let i = 0; i < get().listVocabularies.length; i++) {
            if (get().listVocabularies[i].id === get().currentVocabulary.id) {
                get().listVocabularies[i] = get().currentVocabulary
            }
        }
    },
    deleteWordFromCurrentVocabulary: (index: number) => {
        set((state) => {
            const updatedVocabulary = [...state.currentVocabulary.vocabulary];
            updatedVocabulary.splice(index, 1); // Удаление элемента по индексу
            return {
                currentVocabulary: {
                    ...state.currentVocabulary,
                    vocabulary: updatedVocabulary,
                },
            };
        });
    },
    updateUserVocabulary: () => {
        set((state) => {
            const currentVocab = state.currentVocabulary;
            const currentUser = state.currentUser;

            return {
                currentUser: {
                    ...currentUser,
                    currentVocabularyId: currentVocab.id,
                    data: {
                        ...currentUser.data,
                        userVocabularies: {
                            ...currentUser.data.userVocabularies,
                            [currentVocab.id]: currentVocab
                        }
                    }
                }
            };
        }, false, "currentUser");

        // Если нужно, раскомментируйте следующую строку
        // get().updateUser();
    },




}), {name: "UserSet"}))
