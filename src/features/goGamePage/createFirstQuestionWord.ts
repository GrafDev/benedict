

import {IDictionaryItem} from "../../shared/types.ts";
import {getRandomWord} from "../getRandomWord.ts";

export const createFirstQuestionWord = (dictionary: IDictionaryItem[]):IDictionaryItem =>  getRandomWord(dictionary);
