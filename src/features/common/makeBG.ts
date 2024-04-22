import {GET_BG_URL} from "../../shared/store/constants/backgrounds.ts";
import {useUI} from "../../shared/store/zustand/store.ts";


export const makeBG = (isDark: boolean): string => {
    let BGPicture: string = "";
    // напиши функцию выбора случайного элемента из входящего массива
    const randomItem = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];
    BGPicture = randomItem(GET_BG_URL);
    const isBG: boolean = useUI().isBG;// Switcher backgrounds
    const backgroundColor = useUI(store => store.backgroundColor);

    let BG: string = "";
    if (!BGPicture || !isBG) {

        BG = isDark ? backgroundColor.dark : backgroundColor.light;
    } else {
        BG = isDark ? "linear-gradient(rgba(0, 0, 0, 0.90), rgba(0, 0, 0, 0.4))," + "url(" + BGPicture + ")" : "linear-gradient(rgba(240, 240, 240, 0.90), rgba(0, 0, 0, 0))," + "url(" + BGPicture + ")";
    }
    return BG
}
