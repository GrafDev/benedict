import React from "react";
import { Heading, Flex, useDisclosure} from "@chakra-ui/react";
import useOptions from "../../../shared/hooks/use-options";
import { useUserStore } from "../../../shared/store/zustand";
import { useState } from "react";
import { ModalRenameVocabularyFromDetails } from "./modal/modal-rename-vocabulary-from-details";
import { IVocabulary } from "../../../shared/types/vocabulary-types";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList} from "react-window";
import RowsAuthVocabualries from "./rows-auth-vocabualries.tsx";

const AuthVocabularyNameList: React.FC = () => {
    const listVocabularies = useUserStore(state => state.listVocabularies);
    const { colorElement, gTrans } = useOptions();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [receivedCurrentVocabulary, setReceivedCurrentVocabulary] = useState<IVocabulary>({} as IVocabulary);

    const handlerRenameVocabulary = (_currentVocabulary: IVocabulary) => {
        setReceivedCurrentVocabulary(_currentVocabulary);
        onOpen();
    };

    return (
        <Flex direction="column" h="100%" w="100%">
            <Heading
                size={["sm", "sm", "md", "lg"]}
                color={colorElement}
                p={[2, 3]}
            >
                {gTrans("List of vocabularies:")}
            </Heading>
            <Flex direction="column" h="100%" w="100%">
                <AutoSizer >
                    {({ height, width }: { height: number; width: number }) => (
                        <FixedSizeList
                            height={height}
                            width={width}
                            itemSize={40}
                            itemCount={listVocabularies.length}
                            overscanCount={5}
                        >
                            {(props) => <RowsAuthVocabualries  {...props}
                                listVocabularies={listVocabularies}
                                handlerRenameVocabulary={handlerRenameVocabulary}
                            />}
                        </FixedSizeList>
                    )}
                </AutoSizer>
            </Flex>

            <ModalRenameVocabularyFromDetails
                isOpen={isOpen}
                onClose={onClose}
                receivedCurrentVocabulary={receivedCurrentVocabulary}
            />
        </Flex>
    );
};

export default AuthVocabularyNameList;