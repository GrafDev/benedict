import {BG_URL} from "../../shared/store/constants-store/backgrounds.ts";


export const getBG = (_bg?: string): string => {
    const randomItem = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];
    return  _bg?_bg:randomItem(BG_URL)
}
