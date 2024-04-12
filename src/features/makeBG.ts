import {GET_BG_URL} from "../shared/store/constants/backgrounds.ts";
import {useDict} from "../shared/zustand/store.ts";


export const makeBG = (isDark: boolean): string => {
    let BGPicture: string = "";
    // напиши функцию выбора случайного элемента из входящего массива
    const randomItem = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];
    BGPicture = randomItem(GET_BG_URL);
    const isBG: boolean = useDict().isBG;// Switcher backgrounds


    let BG: string = "";
    if (!BGPicture || !isBG) {

        BG = isDark ? "gray.700" : "gray.200";
    } else {
        BG = isDark ? "linear-gradient(rgba(0, 0, 0, 0.90), rgba(0, 0, 0, 0.4))," + "url(" + BGPicture + ")" : "linear-gradient(rgba(240, 240, 240, 0.90), rgba(0, 0, 0, 0))," + "url(" + BGPicture + ")";
    }
    return BG
}
