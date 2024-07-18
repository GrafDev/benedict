import {FixedSizeList} from "react-window";
import {Row} from "./row-of-list.tsx";
import {IVocabularyItem} from "../../../shared/types.ts";

interface IListOfVocabularyProps {

    vocabulary: IVocabularyItem[],
    height: number,
    width: number,
}

const ListOfVocabulary = ({vocabulary, height, width, }:IListOfVocabularyProps) => {


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
                {(props) => <Row {...props}  vocabulary={vocabulary}/>}

            </FixedSizeList>


    )
}

export default ListOfVocabulary;