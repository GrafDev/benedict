import {useOptionsStore, useUserStore} from "../store/zustand";


const useAuth = () => {
    const email = useUserStore(state => state.currentUser?.email)
    const token = useUserStore(state => state.currentUser?.token)
    const id = useUserStore(state => state.currentUser?.id)
    const name = useUserStore(state => state.currentUser?.username)
    const photoUrl = useUserStore(state => state.currentUser?.photoUrl)
    const userRecord = useUserStore(state => state.currentUser?.userRecord)
    const currentVocabularyId = useOptionsStore(state => state.currentVocabularyId)
    const listVocabularies = useUserStore(state => state.listVocabularies)

    const vocabulariesNames: string[] = [];
    listVocabularies.forEach(vocabulary => {
        vocabulariesNames.push(vocabulary.name);
    });


    return {
        isAuth: !!email,
        email,
        token,
        id,
        name,
        photoUrl,
        currentVocabularyId,
        vocabulariesNames,
        userRecord,
    }
}
export default useAuth