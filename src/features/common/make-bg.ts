
import {BG_DARK, BG_LIGHT} from "../../shared/constants/ui/backgrounds.ts";
import {getBG} from "./getBG.ts";



const  makeBG=(isDark: boolean, isBG: boolean) => {
    const linkBG = getBG()

    let BG: string;

    if (!linkBG || !isBG) {

        BG = isDark
            ? BG_DARK
            : BG_LIGHT
        console.log("makeBG", BG)
    } else {
        BG = isDark
            ? "linear-gradient(rgba(0, 0, 0, 0.90), rgba(0, 0, 0, 0.8))," + "url(" + linkBG + ")"
            : "linear-gradient(rgba(240, 240, 240, 0.90), rgba(0, 0, 0, 0))," + "url(" + linkBG + ")";
        console.log("makeBG", BG)
    }
    return BG
}
export default makeBG;
