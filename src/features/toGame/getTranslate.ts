import {IVocabularyItem} from "../../shared/types/vocabulary-types.ts";


function filterEmptyStrings(obj: any): IVocabularyItem {
    const filteredObj:any= {};
    for (const key in obj) {

        // @ts-ignore
        if (typeof obj[key] === 'string'
            && key !== "id"
            && key !== "mean"
            && key !== "popular"
            && key !== "learning"
            && obj[key].trim() !== '') {
            filteredObj[key] = obj[key];
        }
    }
    return filteredObj;
}



export const getOneTranslateWord = (word: IVocabularyItem): string => {
    let translate: string;
    let tempWord: any;
    if (word) {
        tempWord = filterEmptyStrings(word)
        const keys:string[] = Object.keys(tempWord)
        const randomKey:string = keys[Math.floor(Math.random() * keys.length)]
        translate = tempWord[randomKey] as string

    } else {
        translate = 'Неизвестное слово'
    }
    translate=translate?translate:'Неизвестное слово'
    return translate
}

export const getFullTranslateWord = (word: IVocabularyItem): string => {
    let translate: string;
    let tempWord: any;
    if (word) {
        translate=""
        tempWord = filterEmptyStrings(word)
        const keys:string[] = Object.keys(tempWord)
        translate = keys.map(key => tempWord[key]).join(', ')

    } else {
        translate = 'Неизвестное слово'
    }
    translate=translate?translate:'Неизвестное слово'
    return translate
}

export const getTooltipTranslate = (word: IVocabularyItem): string => {
    let translate: string;
    let tempWord: any;
    if (word) {
        translate=""
        tempWord = filterEmptyStrings(word)
        const keys:string[] = Object.keys(tempWord)
        translate = keys.map(key => key + ': ' + tempWord[key]).join('; ')

    } else {
        translate = 'Неизвестное слово'
    }
    translate=translate?translate:'Неизвестное слово'
    return translate
}