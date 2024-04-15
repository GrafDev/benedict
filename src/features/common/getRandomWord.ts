import {IDictionaryItem} from "../../shared/types.ts";

export const getRandomWord = (dictionary: IDictionaryItem[]):IDictionaryItem =>  dictionary[Math.floor(Math.random() * dictionary.length)];
