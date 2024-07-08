import {FixedSizeList} from "react-window";
import {Row} from "./row-of-list.tsx";
import {useUser} from "../../../shared/store/zustand";


export const ListOfVocabulary = ({ height, width, isOpen, onOpen}: {
    height: number,
    width: number,
    isOpen: boolean,
    onOpen: () => void
}) => {

const vocabulary = useUser(store => store.currentVocabulary)

    return (

            <FixedSizeList
                className={"list-of-vocabulary LIST"}
                height={height}
                itemCount={vocabulary.length}
                itemSize={30}
                style={{
                    overflowX: "hidden",
                    order: 1,
                }}

                width={width}>
                {(props) => <Row {...props}  isOpen={isOpen} onOpen={onOpen}/>}

            </FixedSizeList>


    )
}
