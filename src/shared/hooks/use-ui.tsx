import {useColorModeValue} from "@chakra-ui/react";
import {useUIStore} from "../store/zustand";


const useUI = () => {
    const isDark = useColorModeValue('light', 'dark') === 'dark';
    const colorUI = useUIStore(state => state.colorUI)
    const translations = useUIStore(state => state.translations)
    const language = useUIStore(state => state.language)
    const isBG = useUIStore(state => state.isBG)
    const backgroundColor = useUIStore(state => state.backgroundColor)

    return {
        colorElement: `${colorUI}-${isDark ? 'dark' : 'light'}`,
        isBG,
        language,
        translations,
        isDark,
        colorUI,
        backgroundColor,

    }
}
export default useUI