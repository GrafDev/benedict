import {useUI} from "../../shared/store/zustand/store.ts";


export const makeBG = (isDark: boolean, BGPicture: string): string => {
    // напиши функцию выбора случайного элемента из входящего массива
    const isBG: boolean = useUI().isBG;// Switcher backgrounds
    const backgroundColor = useUI(store => store.backgroundColor);
    let BG: string;

    if (!BGPicture || !isBG) {

        BG = isDark ? backgroundColor.dark : backgroundColor.light;
    } else {
        BG = isDark ? "linear-gradient(rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0.4))," + "url(" + BGPicture + ")" : "linear-gradient(rgba(240, 240, 240, 0.90), rgba(0, 0, 0, 0))," + "url(" + BGPicture + ")";
    }
    return BG
}
