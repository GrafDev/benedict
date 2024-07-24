import { IVocabularyItem } from "../../shared/types.ts";


export const createLearningWords = (_currentDict: IVocabularyItem[], _mainDict: IVocabularyItem[]): IVocabularyItem[] => {
    const result: IVocabularyItem[] = [];
    const usedIndexes = new Set<number>();

    // Функция для получения случайного элемента из массива
    const getRandomItem = (arr: IVocabularyItem[]): IVocabularyItem | null => {
        if (usedIndexes.size === arr.length) return null;
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * arr.length);
        } while (usedIndexes.has(randomIndex));
        usedIndexes.add(randomIndex);
        return arr[randomIndex];
    };

    // Сначала добавляем элементы из _currentDict
    while (result.length < 10 && result.length < _currentDict.length) {
        const item = getRandomItem(_currentDict);
        if (item) result.push(item);
    }

    // Если нужно, добавляем элементы из _mainDict
    while (result.length < 10) {
        const item = getRandomItem(_mainDict);
        if (item && !_currentDict.includes(item)) result.push(item);
    }

    return result;
}