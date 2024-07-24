import React from "react";
import {Button, Checkbox, Flex, useColorModeValue, useControllableState, VStack} from "@chakra-ui/react";
import {useCommon, useDictModal, useUI, useUser} from "../../../shared/store/zustand";
import AdaptiveText from "../../../components/adaptive-text/adaptive-text.tsx";
import {IVocabularyItem} from "../../../shared/types/vocabulary-types.ts";

interface IRowProps {
    vocabulary: IVocabularyItem[];
    index: number;
    onOpen: () => void;
    checkedItems: IVocabularyItem[];
    style: React.CSSProperties;
}

export const RowOfList = ({vocabulary, index, checkedItems, onOpen, style}: IRowProps) => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const colorUI =useUI(store => store.colorUI)
    const currentVocabulary = useUser(store => store.currentVocabulary);
    const setEditWord = useDictModal(store => store.setEditWord);
    const isDefaultVocabulary  = currentVocabulary.id==="default"
    const [isChecked, setIsChecked] = useControllableState({
        defaultValue: false,
        value: checkedItems.includes(vocabulary[index]),
        onChange: (checked) => {
            setIsChecked(checked);
        }
    })
    const addCheckedItem = useCommon(store => store.addCheckedItem);
    const removeCheckedItem = useCommon(store => store.removeCheckedItem);


    const handleCheckChange = (e: any) => {
        const checked = e.target.checked;
        if (checked) {
            addCheckedItem(vocabulary[index]);
        } else {
            removeCheckedItem(vocabulary[index]);
        }
    };

    const handleEditWord = () => {
        if(!isDefaultVocabulary) {
            setEditWord(vocabulary[index], index)
            onOpen()
            console.log("handleEditWord", vocabulary[index].mean)
        }

    }


    return (
        <Button as={Flex}
                key={index}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                rounded={0}
                style={{
                    ...style,
                    background: index % 2
                        ? (isDark ? 'rgba(40, 40, 40, 0.7)' : 'rgba(240, 240, 240, 0.7)')
                        : (isDark ? 'rgba(10, 10, 10, 0.7)' : 'rgba(220, 220, 220, 0.7)'),
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'normal',
                }}
        >
            <Flex
                justifyContent={"center"}
                width="100%"
                padding="1px"
            >
                <VStack w={"auto"}
                        onClick={() => handleEditWord()}
                        style={{
                            transition: 'all 0.3s ease'
                        }}
                        _hover={{
                            cursor:isDefaultVocabulary ? 'default' : 'pointer',
                            transform:isDefaultVocabulary ? 'scale(1)' : 'scale(1.05)',
                        }}
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

                </VStack>
            </Flex>
            <Checkbox size={{base: 'md', sm: 'md', md: 'lg', lg: 'lg', xl: 'lg', '2xl': 'lg'}}
                      colorScheme={colorUI}
                      isChecked={isChecked}
                      onChange={(e) => handleCheckChange(e)}
            />
        </Button>
    )
}

