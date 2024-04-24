import {FixedSizeList} from "react-window";
import {useDict} from "../../shared/store/zustand";
import {Row} from "./row-of-list.tsx";


export const ListOfDictionary = ({height, width,isOpen,onOpen}: { height: number, width: number,isOpen:boolean,onOpen:()=>void }) => {
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
            {(props) => <Row {...props} isOpen={isOpen} onOpen={onOpen} />}
        </FixedSizeList>
    )
}