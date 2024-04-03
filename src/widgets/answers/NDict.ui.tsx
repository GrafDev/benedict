import React from "react";
import {Box,  VStack} from "@chakra-ui/react";
import {IDictionaryItem} from "../../shared/store/constants/defaulDictionary.ts";
import {useDict} from "../../shared/store/zustand/storeUseDict.ts";


export const NDict: React.FC = () => {
    const listWords = useDict(state => state.dict)

    return (
    <VStack as="main"
            h={"100%"}
    >
        {listWords.slice(0, 10).map((word: IDictionaryItem, index) => (
            <Box key={index} p={2} borderBottom="1px solid #ccc">
                {word.word}
            </Box>))
        }
    </VStack>
    )
}