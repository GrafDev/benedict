

import {IDictionaryItem} from "../../shared/types.ts";
import {getRandomWord} from "./index.ts";


export const createQuestionWord = (dictionary: IDictionaryItem[]):IDictionaryItem =>  getRandomWord(dictionary);
