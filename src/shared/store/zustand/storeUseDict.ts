import {create} from "zustand";
import {defaultDictionary} from "../constants/defaulDictionary.js";

export const useDict = create(() => ({
    dict: defaultDictionary,
}))