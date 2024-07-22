import {FixedSizeList} from "react-window";
import {RowOfList} from "./row-of-list.tsx";
import {IVocabularyItem} from "../../../shared/types.ts";
import {useCommon} from "../../../shared/store/zustand";

interface IListOfVocabularyProps {
    vocabulary: IVocabularyItem[],
    height: number,
    width: number,
}

const ListOfVocabulary = ({vocabulary, height, width,}: IListOfVocabularyProps) => {

    const checkedItems = useCommon(store => store.checkedItems);
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
            {(props) => <RowOfList  {...props}
                                    checkedItems={checkedItems} vocabulary={vocabulary}/>}

        </FixedSizeList>


    )
}

export default ListOfVocabulary;