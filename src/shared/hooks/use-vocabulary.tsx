import {useUserStore} from "../store/zustand";


const useVocabulary = () => {
    const listVocabularies = useUserStore(state => state.listVocabularies)
    const currentVocabulary = useUserStore(state => state.currentVocabulary)
    const currentVocabularyIndex = useUserStore(state => state.currentVocabularyIndex)
    const dict2500 = useUserStore(state => state.dict2500)

    return {
        listVocabularies,
        currentVocabulary,
        currentVocabularyIndex,
        dict2500,
    }
}
export default useVocabulary