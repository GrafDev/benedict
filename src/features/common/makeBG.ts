import {BG_DARK, BG_LIGHT} from "../../shared/constants/ui/backgrounds.ts";
import {useUIStore} from "../../shared/store/zustand";



export const make1BG = (isDark: boolean, BGPicture: string): string => {
    const isBG: boolean = useUIStore(state => state.isBG)

    let BG: string;

    if (!BGPicture || !isBG) {

        BG = isDark
            ? BG_DARK
            : BG_LIGHT
    } else {
        BG = isDark
            ? "linear-gradient(rgba(0, 0, 0, 0.90), rgba(0, 0, 0, 0.8))," + "url(" + BGPicture + ")"
            : "linear-gradient(rgba(240, 240, 240, 0.90), rgba(0, 0, 0, 0))," + "url(" + BGPicture + ")";
    }
    return BG
}
