import {backgroundDark, backgroundLight} from "../../shared/ui/constants/backgrounds.ts";
import {useUI} from "../../shared/store/zustand";



export const makeBG = (isDark: boolean, BGPicture: string): string => {
    const isBG: boolean = useUI(state => state.isBG)

    let BG: string;

    if (!BGPicture || !isBG) {

        BG = isDark
            ? backgroundDark
            : backgroundLight
    } else {
        BG = isDark
            ? "linear-gradient(rgba(0, 0, 0, 0.90), rgba(0, 0, 0, 0.8))," + "url(" + BGPicture + ")"
            : "linear-gradient(rgba(240, 240, 240, 0.90), rgba(0, 0, 0, 0))," + "url(" + BGPicture + ")";
    }
    return BG
}
