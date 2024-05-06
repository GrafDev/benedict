import {FixedSizeList} from "react-window";
import {useUser} from "../../shared/store/zustand";
import {Row} from "./row-of-list.tsx";


export const ListOfDictionary = ({height, width, isOpen, onOpen}: {
    height: number,
    width: number,
    isOpen: boolean,
    onOpen: () => void
}) => {
    const currentDict = useUser((state) => state.currentDict)


    return (

            <FixedSizeList
                className={"list-of-dictionary LIST"}
                height={height}
                itemCount={currentDict.length}
                itemSize={35}

                style={{
                    overflowX: "hidden",
                    order: 1,
                }}

                width={width}>

                {(props) => <Row {...props} isOpen={isOpen} onOpen={onOpen}/>}

            </FixedSizeList>


    )
}