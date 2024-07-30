import {Text, Heading, Flex, IconButton, VStack, useDisclosure, Button, HStack, Box, Radio} from "@chakra-ui/react";
import useOptions from "../../../shared/hooks/use-options.tsx";
import {EditIcon} from "@chakra-ui/icons";
import {useUserStore} from "../../../shared/store/zustand";
import {useState} from "react";
import {ModalRenameVocabularyFromDetails} from "./modal/modal-rename-vocabulary-from-details.tsx";
import {IVocabulary} from "../../../shared/types/vocabulary-types.ts";

interface IAuthUserInfoProps {
    index: number;
    vocabulary: IVocabulary;
    handlerRenameVocabulary: (_currentVocabulary: IVocabulary) => void
}

const AuthUserVocabularyLine = ({index, vocabulary, handlerRenameVocabulary}: IAuthUserInfoProps) => {
    const {colorElement,gTrans, isDark} = useOptions()
    const listVocabularies = useUserStore(store => store.listVocabularies)
    const setCurrentVocabularyIndex = useUserStore(store => store.setCurrentVocabularyIndex)
    const handleMakeCurrent = () => {
            const index = listVocabularies.findIndex((vocabulary: IVocabulary) => vocabulary.id === vocabulary.id)
            setCurrentVocabularyIndex(index)
    }

    return (
        <Flex gap={[2, 3, 4, 5]} direction={"row"} alignItems={"center"} justifyContent={"space-between"} p={1}
              pl={[2, 3, 4, 5]}
              style={{
                  background: index % 2
                      ? (isDark ? 'rgba(40, 40, 40, 0.7)' : 'rgba(240, 240, 240, 0.7)')
                      : (isDark ? 'rgba(10, 10, 10, 0.7)' : 'rgba(220, 220, 220, 0.7)'),
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  whiteSpace: 'normal',
              }}>
            <Text fontSize={"md"} variant={"ghost"} cursor={"pointer"}
                  w={"auto"}
                  onClick={() => handleMakeCurrent()}
                  style={{
                      transition: 'all 0.3s ease'
                  }}
                  _hover={{
                      cursor: 'pointer',
                      transform:'scale(1.05)',
                  }}>
                {vocabulary.name ? vocabulary.name : '-'}
            </Text>

            <HStack p={index===0?1:0} h={"40px"}>
                <Text hidden={index === 0} fontSize={"sm"} variant={"ghost"}>
                    {gTrans("Edit name")}
                </Text>
            <IconButton variant={"ghost"}
                        hidden={index === 0}
                        onClick={() => handlerRenameVocabulary(vocabulary)}
                        _hover={{
                            color: colorElement,
                            transform: 'scale(1.1)'
                        }}
                        aria-label={"Edit"} icon={<EditIcon/>}
            />


            </HStack>
        </Flex>
    )
}


const AuthVocabularyNameList = () => {
    const listVocabularies = useUserStore(state => state.listVocabularies)
    const {colorElement, isDark, gTrans} = useOptions()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [receivedCurrentVocabulary, setReceivedCurrentVocabulary] = useState<IVocabulary>({} as IVocabulary)

    const handlerRenameVocabulary = (_currentVocabulary: IVocabulary) => {
        setReceivedCurrentVocabulary(_currentVocabulary)
        onOpen()
    }

    return (
        <VStack h={"full"} align={"left"} w={"100%"}>

            <Heading size={["sm", "sm", "md", "lg"]}
                     color={colorElement}
                     p={[2, 3, 4, 5]}>
                {gTrans("List of vocabularies:")}
            </Heading>

            <Flex direction={"column"} overflowY={"scroll"}
                  scrollBehavior={"smooth"}
                  h={"25dvh"}
                  style={{background: (isDark ? 'rgba(40, 40, 40, 0.2)' : 'rgba(240, 240, 240, 0.2)')}} p={4}
            >
                {listVocabularies.map((_vocabulary, index) => {
                    return (

                        <AuthUserVocabularyLine key={index} index={index} vocabulary={_vocabulary}
                                                handlerRenameVocabulary={handlerRenameVocabulary}/>
                    )
                })}
            </Flex>
            <ModalRenameVocabularyFromDetails isOpen={isOpen} onClose={onClose}
                                              receivedCurrentVocabulary={receivedCurrentVocabulary}/>
        </VStack>
    )
}
export default AuthVocabularyNameList