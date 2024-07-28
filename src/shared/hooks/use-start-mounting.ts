import {DEFAULT_USER, DEFAULT_VOCABULARY, LINGVO_VOCABULARY} from "../constants";
import {easyVocabularyStore} from "../constants/vocabularies/easy-vocabulary.ts";
import {useOptionsStore, useUserStore} from "../store/zustand";
import {IVocabulary,} from "../types/vocabulary-types.ts";
import {onAuthStateChanged, User} from "firebase/auth";
import {authUser} from "../store/firebase/firebase.ts";
import makeUser from "../../features/user-features/make-user.ts";

const useStartMounting = () => {
    const addVocabulary = useUserStore(state => state.addVocabulary)
    const listVocabularies: IVocabulary[] = [DEFAULT_VOCABULARY, LINGVO_VOCABULARY, easyVocabularyStore]
    const readUserOptionsFromLocalStorage = useOptionsStore(state => state.readUserOptionsFromLocalStorage)
    readUserOptionsFromLocalStorage()
    const setCurrentVocabularyIndex = useUserStore(state => state.setCurrentVocabularyIndex)
    const currentVocabularyId = useOptionsStore(state => state.currentVocabularyId)
    const setCurrentUser = useUserStore(state => state.setCurrentUser)

    //Set vocabularies and current vocabulary
    const startMountingVocabularies = () => {
        for (let i = 0; i < listVocabularies.length; i++) {
            addVocabulary(listVocabularies[i])
            if (listVocabularies[i].id === currentVocabularyId) {
                setCurrentVocabularyIndex(i)
            }
        }
    }
    const startMountingUser = () => {
        onAuthStateChanged(authUser, (userCredential: User | null) => {
            if (userCredential) {
                setCurrentUser(makeUser(userCredential))
            } else {
                setCurrentUser(DEFAULT_USER)
            }
        });
    }
    return {
        startMountingVocabularies,
        startMountingUser,
    }
}


export default useStartMounting;
// useEffect(() => {
//     const unsubscribe = onAuthStateChanged(authUser, (userCredential: User | null) => {
//         if (userCredential) {
//             setCurrentUser(makeUser(userCredential))
//         } else {
//             setCurrentUser(DEFAULT_USER)
//         }
//     });

//     return () => unsubscribe();
// }, []);


// onAuthStateChanged(authUser, (userCredential: User | null) => {
//     if (userCredential) {
//         setCurrentUser(makeUser(userCredential))
//     } else {
//         setCurrentUser(DEFAULT_USER)
//     }
// });