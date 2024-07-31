import {IVocabulary} from "../../../shared/types/vocabulary-types.ts";
import {Button, Flex, HStack, IconButton, Text, Tooltip} from "@chakra-ui/react";
import {ChevronLeftIcon, EditIcon} from "@chakra-ui/icons";
import useOptions from "../../../shared/hooks/use-options.tsx";
import {useUserStore} from "../../../shared/store/zustand";
import React, {useCallback} from "react";
import {ListChildComponentProps} from "react-window";

interface IListRowsVocabualriesProps {
    listVocabularies: IVocabulary[],
    index: number,
    style: React.CSSProperties,
    handlerRenameVocabulary: (_currentVocabulary: IVocabulary) => void
}

interface RowsAuthVocabualriesProps extends ListChildComponentProps<any> {
    listVocabularies: IVocabulary[];
    handlerRenameVocabulary: (vocabulary: IVocabulary) => void;
}


const RowsAuthVocabualries: React.FC<RowsAuthVocabualriesProps> = ({
                                                                       listVocabularies,
                                                                       index,
                                                                       style,
                                                                       handlerRenameVocabulary
                                                                   }: IListRowsVocabualriesProps) => {
    const {colorElement, gTrans, isDark} = useOptions()
    const setCurrentVocabularyIndex = useUserStore(store => store.setCurrentVocabularyIndex)
    const currentVocabulary = useUserStore(store => store.currentVocabulary)

    const handleMakeCurrent = useCallback(() => {
        const _index = listVocabularies.findIndex((_vocabulary: IVocabulary) => _vocabulary.id === listVocabularies[index].id)
        setCurrentVocabularyIndex(_index)
    }, [listVocabularies, index, setCurrentVocabularyIndex]);


    return (
        <Flex direction={"row"}
              key={index}
              alignItems={"center"}
              justifyContent={"space-between"}
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

            <Flex as={Button}  w={"100%"}
                    onClick={() => handleMakeCurrent()}
                    rounded={0}
                    justifyContent={"start"}
                    style={{
                        transition: 'all 0.3s ease',
                        background: index % 2
                            ? (isDark ? 'rgba(40, 40, 40, 0.7)' : 'rgba(240, 240, 240, 0.7)')
                            : (isDark ? 'rgba(10, 10, 10, 0.7)' : 'rgba(220, 220, 220, 0.7)'),
                    }}
                    _hover={{
                        cursor: currentVocabulary.id === listVocabularies[index].id ? 'default' : 'pointer',
                        transform: currentVocabulary.id === listVocabularies[index].id ? "" : 'scale(1.01)',
                    }}
            >
                <HStack>
                <Tooltip label={gTrans("Click to set current vocabulary")} placement='auto' openDelay={300}
                         isDisabled={currentVocabulary.id === listVocabularies[index].id}>
                    <Text fontSize={"md"} variant={"ghost"} cursor={"pointer"} w={"100%"}>
                        {listVocabularies[index].name ? listVocabularies[index].name : '-'}
                    </Text>
                </Tooltip>
                {currentVocabulary.id === listVocabularies[index].id &&
                  <HStack>
                    <ChevronLeftIcon color={colorElement} h={4} w={4}/>
                    <Text color={colorElement} fontSize={"sm"} variant={"ghost"}>
                        {gTrans("current vocabulary")}
                    </Text>
                  </HStack>
                }
                </HStack>
            </Flex>

            <HStack h={"40px"}>
                <Tooltip label={gTrans("Edit name")} placement='auto' openDelay={300}>
                    <IconButton variant={"ghost"}
                                isDisabled={index === 0}
                                onClick={() => handlerRenameVocabulary(listVocabularies[index])}
                                _hover={{
                                    color: colorElement,
                                    transform: 'scale(1.1)'
                                }}
                                aria-label={"Edit"} icon={<EditIcon/>}
                    />
                </Tooltip>
            </HStack>
        </Flex>
    )
}

export default React.memo(RowsAuthVocabualries);