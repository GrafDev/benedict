import {FixedSizeList} from "react-window";
import {RowOfList} from "./row-of-list.tsx";
import {IVocabularyItem} from "../../../shared/types.ts";
import {useEffect, useState} from "react";
import {useCommon} from "../../../shared/store/zustand";

interface IListOfVocabularyProps {
    vocabulary: IVocabularyItem[],
    height: number,
    width: number,
}

const ListOfVocabulary = ({vocabulary, height, width,}: IListOfVocabularyProps) => {

    const [listChecked, setListChecked] = useState<IVocabularyItem[]>([]);
    const haveWordsForCopy = useCommon(store => store.haveWordsForCopy)
    const addListChecked = (item: IVocabularyItem, checked: boolean) => {
        const updatedListChecked = [...listChecked]; // Создайте копию массива


        if (checked) {
            // Если checked = true, проверьте, есть ли элемент в массиве
            const existingIndex = updatedListChecked.findIndex(listItem => listItem.id === item.id);
            if (existingIndex === -1) { // Если элемент не найден, добавьте его
                updatedListChecked.push(item);
            }
        } else {
            // Если checked = false, удалите элемент из массива
            const existingIndex = updatedListChecked.findIndex(listItem => listItem.id === item.id);
            if (existingIndex !== -1) { // Если элемент найден, удалите его
                updatedListChecked.splice(existingIndex, 1);
            }
        }

        setListChecked(updatedListChecked); // Обновите список
    };

    useEffect(() => {
        if (!haveWordsForCopy) {
            setListChecked([])
        }
    }, [haveWordsForCopy]);

    return (

        <FixedSizeList
            className={"list-of-vocabulary LIST"}
            height={height}
            itemCount={vocabulary.length}
            itemSize={60}
            style={{
                overflowX: "hidden",
                order: 1,
            }}

            width={width}>
            {(props) => <RowOfList {...props} addListChecked={addListChecked} listChecked={listChecked}
                                   vocabulary={vocabulary}/>}

        </FixedSizeList>


    )
}

export default ListOfVocabulary;