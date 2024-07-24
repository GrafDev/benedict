import {FixedSizeList} from "react-window";
import {RowOfList} from "./row-of-list.tsx";
import {useCommon} from "../../../shared/store/zustand";
import {ModalCommon} from "../../../components/modal/modal-common.tsx";
import {useDisclosure} from "@chakra-ui/react";
import {IVocabularyItem} from "../../../shared/types/vocabulary-types.ts";

interface IListOfVocabularyProps {
    vocabulary: IVocabularyItem[],
    height: number,
    width: number,
}

const ListOfVocabulary = ({vocabulary, height, width,}: IListOfVocabularyProps) => {

    const checkedItems = useCommon(store => store.checkedItems);
    const {isOpen, onOpen, onClose} = useDisclosure()
    return (
        <>
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
                                        onOpen={onOpen}
                                        checkedItems={checkedItems}
                                        vocabulary={vocabulary}/>}

            </FixedSizeList>
            <ModalCommon isOpen={isOpen} onClose={onClose} optionsModal={"editWord"}/>
        </>
    )
}

export default ListOfVocabulary;