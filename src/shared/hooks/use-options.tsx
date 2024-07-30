import {useColorModeValue} from "@chakra-ui/react";
import {useOptionsStore} from "../store/zustand";
import {buttonStyles} from "../ui/button-style.ts";


const useOptions = () => {
    const isDark = useColorModeValue('light', 'dark') === 'dark';
    const colorUI = useOptionsStore(state => state.colorUI)
    const translations = useOptionsStore(state => state.translations)
    const language = useOptionsStore(state => state.language)
    const isBG = useOptionsStore(state => state.isBG)
    const backgroundColor = useOptionsStore(state => state.backgroundColor)
    const buttonStyle = buttonStyles(colorUI, 350, 95, 10, colorUI === 'gray' ? isDark : !isDark)
    const currentVocabularyId = useOptionsStore(state => state.currentVocabularyId)

    const getTranslate = (word: string) => {
        try {
            const translateWord = translations[language][word]
            // console.log("getTranslate", word, translateWord)
            if (translateWord) {
                return translateWord
            }
        }catch (e) {
            console.log(e)
        }
        return word
    }


    return {
        colorElement: `${colorUI}.${isDark ? '200' : '600'}`,
        isBG,
        isDark,
        colorUI,
        backgroundColor,
        buttonStyle,
        currentVocabularyId,
        language,
        gTrans: getTranslate,
    }
}
export default useOptions