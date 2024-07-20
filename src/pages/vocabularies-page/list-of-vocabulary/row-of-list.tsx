import {Box, Button, Checkbox, Flex, useColorModeValue} from "@chakra-ui/react";
import {useCommon, useDictModal, useUser} from "../../../shared/store/zustand";
import AdaptiveText from "../../../components/adaptive-text/adaptive-text.tsx";
import {IVocabularyItem} from "../../../shared/types.ts";
import React from "react";

interface IRowProps {
    vocabulary: IVocabularyItem[];
    index: number;
    addListChecked: (item: IVocabularyItem, checked: boolean) => void;
    listChecked: IVocabularyItem[];
    style: React.CSSProperties;
}


export const RowOfList = ({vocabulary, index, addListChecked, listChecked, style}: IRowProps) => {
    const setEditWord = useDictModal((state) => state.setEditWord)
    const addCheckedItem= useCommon((state) => state.addCheckedItem)
    const removeCheckedItem= useCommon((state) => state.removeCheckedItem)
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const colorUI = useUser(store => store.currentUser.colorUI)

    const isCheckedBox= listChecked.includes(vocabulary[index])


    const handler = () => {
        setEditWord(vocabulary[index], index)
    }

    const handleCheckChange = (e: any) => {
        const { checked } = e.target;
        addListChecked(vocabulary[index], checked);
        if (checked) {
            addCheckedItem(vocabulary[index])
        } else {
            removeCheckedItem(vocabulary[index])
        }
    };

    return (
        <Button as={Flex}
                flexDirection={"row"}
                key={index}
                rounded={0}
                style={{
                    ...style,
                    background: index % 2
                        ? (isDark ? 'rgba(40, 40, 40, 0.7)' : 'rgba(240, 240, 240, 0.7)')
                        : (isDark ? 'rgba(10, 10, 10, 0.7)' : 'rgba(220, 220, 220, 0.7)'),
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'normal'
                }}
        >
            <Flex
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                onClick={() => handler()}
                width="100%"
                padding="1px"
            >
                <p style={{
                    width: '100%',
                    wordBreak: 'break-word',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}>
                    {vocabulary[index].mean}
                </p>
                <AdaptiveText initialFontSize={14} text={vocabulary[index].translate}/>
            </Flex>
            <Box>
                <Checkbox size={{base: 'md', sm: 'md', md: 'lg', lg: 'lg', xl: 'lg', '2xl': 'lg'}}
                          colorScheme={colorUI}
                          isChecked={isCheckedBox}
                          onChange={(e)=>handleCheckChange(e)}
                />
            </Box>
        </Button>
    )
}

