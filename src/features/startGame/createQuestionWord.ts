

import {IDictionaryItem} from "../../shared/types.ts";
import {getRandomWord} from "../common";

export const createQuestionWord = (dictionary: IDictionaryItem[]):IDictionaryItem =>  getRandomWord(dictionary);
