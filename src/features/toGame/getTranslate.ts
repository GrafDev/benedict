import {IDictionaryItem} from "../../shared/types.ts";


function filterEmptyStrings(obj: IDictionaryItem): IDictionaryItem {
    const filteredObj: IDictionaryItem = {};
    for (const key in obj) {

        if (typeof obj[key] === 'string'
            && key !== "id"
            && key !== "word"
            && key !== "transcription"
            && key !== "descrip"
            && key !== "phrase"
            && key !== "popular"
            && key !== "learning"
            && obj[key].trim() !== '') {
            filteredObj[key] = obj[key];
        }
    }
    return filteredObj;
}



export const getTranslate = (word: IDictionaryItem): string => {
    let translate: string;
    let tempWord: IDictionaryItem;
    if (word) {
        tempWord = filterEmptyStrings(word)
        const keys:string[] = Object.keys(tempWord)
        const randomKey:string = keys[Math.floor(Math.random() * keys.length)]
        translate = tempWord[randomKey] as string

    } else {
        tempWord = word
        translate = 'Неизвестное слово'
    }

    return translate
}