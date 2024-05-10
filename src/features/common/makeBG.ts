import {useUI} from "../../shared/store/zustand";
import {useUser} from "../../shared/store/zustand/store-user.ts";


export const makeBG = (isDark: boolean, BGPicture: string): string => {
    const isBG: boolean = useUser(store => store.currentUser.isBG);
    const backgroundColor = useUI(store => store.backgroundColor);

    let BG: string;

    if (!BGPicture || !isBG) {

        BG = isDark ? backgroundColor.dark : backgroundColor.light;
    } else {
        BG = isDark ? "linear-gradient(rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0.4))," + "url(" + BGPicture + ")" : "linear-gradient(rgba(240, 240, 240, 0.90), rgba(0, 0, 0, 0))," + "url(" + BGPicture + ")";
    }
    return BG
}
