
import {useUI} from "../store/zustand";
import {backgroundDark, backgroundLight} from "../ui/constants/backgrounds.ts";
import {useColorModeValue} from "@chakra-ui/react";

function useMakeBG(): string {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const BGPicture = useUI(state => state.linkBG)
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

export default useMakeBG;
