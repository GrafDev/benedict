import {FixedSizeList} from "react-window";
import {Row} from "./row-of-list.tsx";
import {IVocabularyItem} from "../../../shared/types.ts";


export const ListOfVocabulary = ({vocabulary, height, width, isOpen, onOpen}: {
    vocabulary: IVocabularyItem[],
    height: number,
    width: number,
    isOpen: boolean,
    onOpen: () => void
}) => {

    console.log("ListOfVocabulary1", vocabulary)
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
                {(props) => <Row {...props}  vocabulary={vocabulary} isOpen={isOpen} onOpen={onOpen}/>}

            </FixedSizeList>


    )
}
