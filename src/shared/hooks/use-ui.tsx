import {useColorModeValue} from "@chakra-ui/react";
import {useUIStore} from "../store/zustand";
import {buttonStyles} from "../ui/button-style.ts";


const useUI = () => {
    const isDark = useColorModeValue('light', 'dark') === 'dark';
    const colorUI = useUIStore(state => state.colorUI)
    const translations = useUIStore(state => state.translations)
    const language = useUIStore(state => state.language)
    const isBG = useUIStore(state => state.isBG)
    const backgroundColor = useUIStore(state => state.backgroundColor)
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