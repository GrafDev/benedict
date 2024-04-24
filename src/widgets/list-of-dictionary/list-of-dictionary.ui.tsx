import {FixedSizeList} from "react-window";
import {useDict} from "../../shared/store/zustand";
import {Row} from "./row-of-list.tsx";


export const ListOfDictionary = ({height, width}: { height: number, width: number }) => {
const mainDict=useDict((state)=>state.mainDict)


    return (

        <FixedSizeList
            className={"list-of-dictionary LIST"}
            height={height}
            itemCount={mainDict.length}
            itemSize={35}
            style={{
                overflowX: "hidden",
        }}
            width={width}>
            {Row }
        </FixedSizeList>
    )
}