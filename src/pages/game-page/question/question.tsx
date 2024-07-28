import {Box, Text} from '@chakra-ui/react';
import {useCommonStore, useUserStore} from "../../../shared/store/zustand";
import {getFullTranslateWord, getOneTranslateWord} from "../../../features/toGame";
import {IVocabularyItem} from "../../../shared/types/vocabulary-types.ts";
import useOptions from "../../../shared/hooks/use-options.tsx";

export const Question = ({preStart,}: { preStart: boolean }) => {
    const {isDark, language, translations} = useOptions()
    const isStart: boolean = useCommonStore(state => state.isStart)
    const questionWord:IVocabularyItem = useUserStore(state => state.questionWord)
    const isTranslate = useUserStore(state => state.isTranslate)
    const learningWords = useUserStore(state => state.learningWords)
    const previousQuestionWord = useUserStore(state => state.previousQuestionWord)
    const mistakes = useCommonStore(state => state.mistakes)
    const isLearning = useCommonStore(state => state.isLearning)

    return (
            <Box justifySelf={'center'}
                 h={"auto"}
                 w={{base: '90%', sm: '90%', md: '70%', lg: '90%', xl: '80%', "2xl": '90%'}}
                 minH={"50px"}
                 maxW={"720px"}
                 maxH={"100%"}
                 border={mistakes > 0 ? "3px solid red" : "1px solid transparent"}
                 m={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
                 p={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
                 alignContent={'center'}
                 rounded={"xl"}
                 background={isDark ? 'rgba(10, 10, 10, 0.7)' : 'rgba(250, 250, 250, 0.7)'}
            >
                {!isStart && preStart &&
                  <Text fontSize={{base: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl", "2xl": "2xl"}}
                        color={isDark ? 'gray.200' : 'black'}
                        pr={3} pl={3}
                        maxW={"100%"}
                        align={'center'}>
                      {translations[language].beforeStart}
                  </Text>}
                <Text
                    fontSize={{base: "lg", sm: "lg", md: "lg", lg: "xl", xl: "2xl", "2xl": "2xl"}}
                    color={isDark ? 'gray.200' : 'black'}
                    pr={3} pl={3}
                    maxW={"100%"}
                    fontWeight={"bold"}
                    align={'center'}>
                    {learningWords.length > 1
                        ? isTranslate
                            ? getOneTranslateWord(questionWord) + (isLearning ? (" - " + questionWord.mean) : "")
                            : (questionWord.mean
                                + (isLearning ? (" - " + getFullTranslateWord(questionWord)) : ""))
                        : translations[language].atLast
                    }
                    {mistakes > 0 && <Text
                      color={"red"}> {previousQuestionWord.mean} - {getFullTranslateWord(previousQuestionWord)}</Text>}
                </Text>
            </Box>

    )
        ;
}