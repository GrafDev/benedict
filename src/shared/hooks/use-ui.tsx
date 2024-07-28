import {useColorModeValue} from "@chakra-ui/react";
import {useOptionsStore} from "../store/zustand";
import {buttonStyles} from "../ui/button-style.ts";


const useUI = () => {
    const isDark = useColorModeValue('light', 'dark') === 'dark';
    const colorUI = useOptionsStore(state => state.colorUI)
    const translations = useOptionsStore(state => state.translations)
    const language = useOptionsStore(state => state.language)
    const isBG = useOptionsStore(state => state.isBG)
    const backgroundColor = useOptionsStore(state => state.backgroundColor)
    const buttonStyle = buttonStyles(colorUI,350,95,10,colorUI==='gray'?isDark: !isDark)
    return {
        colorElement: `${colorUI}-${isDark ? 'dark' : 'light'}`,
        isBG,
        language,
        translations,
        isDark,
        colorUI,
        backgroundColor,
        buttonStyle,

    }
}
export default useUI