import {BG_URL} from "../../shared/store/constants-store/backgrounds.ts";


export const getBG = (): string => {

    const randomItem = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];
    return  randomItem(BG_URL);
}
