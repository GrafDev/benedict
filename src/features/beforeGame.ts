

import {IDictionaryItem} from "../shared/types.ts";
import {defaultDictionary} from "../shared/store/constants/defaulDictionary.ts";

export const setFirstQuestionWord = ():IDictionaryItem =>  defaultDictionary[Math.floor(Math.random() * defaultDictionary.length)];
