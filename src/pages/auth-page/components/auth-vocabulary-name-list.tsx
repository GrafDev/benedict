import {Text, Heading, Flex, IconButton,  useDisclosure, HStack, Tooltip,} from "@chakra-ui/react";
import useOptions from "../../../shared/hooks/use-options.tsx";
import {ChevronLeftIcon, EditIcon} from "@chakra-ui/icons";
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
    const {colorElement, gTrans, isDark} = useOptions()
    const listVocabularies = useUserStore(store => store.listVocabularies)
    const setCurrentVocabularyIndex = useUserStore(store => store.setCurrentVocabularyIndex)
    const currentVocabulary = useUserStore(store => store.currentVocabulary)

    const handleMakeCurrent = () => {

        const index = listVocabularies.findIndex((_vocabulary: IVocabulary) => _vocabulary.id === vocabulary.id)
        setCurrentVocabularyIndex(index)
    }

    return (
        <Flex h={"100%"} direction={"row"} alignItems={"center"} justifyContent={"space-between"} p={1}
              pl={[2, 3, 4, 5]}
              style={{
                  background: index % 2
                      ? (isDark ? 'rgba(40, 40, 40, 0.7)' : 'rgba(240, 240, 240, 0.7)')
                      : (isDark ? 'rgba(10, 10, 10, 0.7)' : 'rgba(220, 220, 220, 0.7)'),
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  whiteSpace: 'normal',
              }}>

            <HStack spacing={[2, 3, 4, 5]}>
                <Tooltip label={gTrans("Click to set current vocabulary")} placement='auto' openDelay={300}
                         isDisabled={currentVocabulary.id === vocabulary.id}>
                    <Text fontSize={"md"} variant={"ghost"} cursor={"pointer"}
                          w={"auto"}
                          onClick={() => handleMakeCurrent()}
                          style={{
                              transition: 'all 0.3s ease'
                          }}
                          _hover={{
                              cursor: currentVocabulary.id === vocabulary.id ? 'default' : 'pointer',
                              transform:currentVocabulary.id === vocabulary.id ?"" : 'scale(1.05)',
                          }}>
                        {vocabulary.name ? vocabulary.name : '-'}
                    </Text>
                </Tooltip>
                {currentVocabulary.id === vocabulary.id &&
                  <HStack>
                    <ChevronLeftIcon color={colorElement} h={4} w={4}/>
                    <Text color={colorElement} fontSize={"sm"} variant={"ghost"}>
                        {gTrans("current vocabulary")}
                    </Text>
                  </HStack>}

            </HStack>

            <HStack p={index === 0 ? 1 : 0} h={"40px"}>
                <Tooltip label={gTrans("Edit name")} placement='auto' openDelay={300}>
                    <IconButton variant={"ghost"}
                                hidden={index === 0}
                                onClick={() => handlerRenameVocabulary(vocabulary)}
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

        <Flex direction={"column"} h={"100%"}  w={"100%"}>

            <Heading size={["sm", "sm", "md", "lg"]}
                     color={colorElement}
                     p={[2, 3]}>
                {gTrans("List of vocabularies:")}
            </Heading>

            <Flex direction={"column"} overflowY={"scroll"}
                  scrollBehavior={"smooth"}
                  style={{background: (isDark ? 'rgba(40, 40, 40, 0.2)' : 'rgba(240, 240, 240, 0.2)')}}
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
        </Flex>
    )
}
export default AuthVocabularyNameList