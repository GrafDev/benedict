

import {IDictionaryItem} from "../../shared/types.ts";
import {getRandomWord} from "../getRandomWord.ts";

export const createQuestionWord = (dictionary: IDictionaryItem[]):IDictionaryItem =>  getRandomWord(dictionary);
