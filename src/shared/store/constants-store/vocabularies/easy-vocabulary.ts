import {IVocabulary, IVocabularyItem} from "../../../types.ts";

const easyVocabulary: IVocabularyItem[] = [
    {
        id: "0",
        mean: "hello",
        translate: "привет",
        learning: 0,
        popular: 100
    },
    {
       
        id: "1",
        mean: "goodbye",
        translate: "пока",
        learning: 0,
        popular: 90
    },
    {
       
        id: "2",
        mean: "thank you",
        translate: "спасибо",
        learning: 0,
        popular: 80
    },
    {
       
        id: "3",
        mean: "good",
        translate: "хорошо",
        learning: 0,
        popular: 70
    },
    {
       
        id: "4",
        mean: "bad",
        translate: "плохо",
        learning: 0,
        popular: 60
    },
    {
       
        id: "5",
        mean: "yes",
        translate: "да",
        learning: 0,
        popular: 50
    },
    {
       
        id: "6",
        mean: "no",
        translate: "нет",
        learning: 0,
        popular: 40
    },
    {
       
        id: "7",
        mean: "maybe",
        translate: "может быть",
        learning: 0,
        popular: 30
    },
    {
       
        id: "8",
        mean: "please",
        translate: "пожалуйста",
        learning: 0,
        popular: 20
    },
    {
       
        id: "9",
        mean: "thank you very much",
        translate: "спасибо большое",
        learning: 0,
        popular: 10
    },
    {
       
        id: "10",
        mean: "in the end",
        translate: "в конце концов",
        learning: 0,
        popular: 0
    },
    {
       
        id: "11",
        mean: "in the beginning",
        translate: "в начале начал",
        learning: 0,
        popular: 0
    },
    {
       
        id: "12",
        mean: "in the middle",
        translate: "в середине",
        learning: 0,
        popular: 0
    },
    {
       
        id: "13",
        mean: "in the evening",
        translate: "в вечернее время",
        learning: 0,
        popular: 0
    },
    {
       
        id: "14",
        mean: "in the morning",
        translate: "в утреннее время",
        learning: 0,
        popular: 0
    },
    {
       
        id: "15",
        mean: "in the afternoon",
        translate: "в дней после обеда",
        learning: 0,
        popular: 0
    },
    {
       
        id: "16",
        mean: "in the night",
        translate: "в ночное время",
        learning: 0,
        popular: 0
    },
    {
       
        id: "17",
        mean: "living room",
        translate: "гостиная",
        learning: 0,
        popular: 0
    },
    {
       
        id: "18",
        mean: "kitchen",
        translate: "кухня",
        learning: 0,
        popular: 0
    },
    {
       
        id: "19",
        mean: "bedroom",
        translate: "спальня",
        learning: 0,
        popular: 0
    },
    {
       
        id: "20",
        mean: "bathroom",
        translate: "ванная",
        learning: 0,
        popular: 0
    },
    {
       
        id: "21",
        mean: "toilet",
        translate: "туалет",
        learning: 0,
        popular: 0
    },
    {
       
        id: "22",
        mean: "toilet paper",
        translate: "бумажка",
        learning: 0,
        popular: 0
    },
    {
       
        id: "23",
        mean: "toilet brush",
        translate: "ершик",
        learning: 0,
        popular: 0
    },
    {
       
        id: "24",
        mean: "toothpaste",
        translate: "зубная паста",
        learning: 0,
        popular: 0
    },
    {
       
        id: "25",
        mean: "toothbrush",
        translate: "зубная щетка",
        learning: 0,
        popular: 0
    }
]

export const easyVocabularyStore: IVocabulary = {
    id: "easy",
    name: "Easy Vocabulary",
    vocabulary: easyVocabulary

}