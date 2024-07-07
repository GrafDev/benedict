import {Box, Text, useColorModeValue} from '@chakra-ui/react';
import {useCommon, useUser} from "../../../shared/store/zustand";
import {getFullTranslateWord, getOneTranslateWord} from "../../../features/toGame";

export const Question = ({preStart,}: { preStart: boolean }) => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const isStart: boolean = useCommon(state => state.isStart)
    const questionWord = useUser(state => state.questionWord)
    const isTranslate = useUser(state => state.isTranslate)
    const learningWords = useUser(state => state.learningWords)
    const isMistake = useUser(state => state.isMistake)
    const previousQuestionWord = useUser(state => state.previousQuestionWord)
    const isLearning = useUser(state => state.isLearning)
    const translations = useUser(state => state.translations)
    const language = useUser(state => state.currentUser.language)

    return (
            <Box justifySelf={'center'}
                 h={"auto"}
                 w={"90%"}
                 minH={"50px"}
                 maxW={"720px"}
                 maxH={"100%"}
                 border={isMistake ? "3px solid red" : "1px solid transparent"}
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
                    fontSize={{base: "xl", sm: "xl", md: "xl", lg: "xl", xl: "2xl", "2xl": "4xl"}}
                    color={isDark ? 'gray.200' : 'black'}
                    pr={3} pl={3}
                    maxW={"100%"}
                    fontWeight={"bold"}
                    align={'center'}>
                    {learningWords.length > 1
                        ? isTranslate
                            ? getOneTranslateWord(questionWord) + (isLearning ? (" - " + questionWord.word) : "")
                            : (questionWord.word
                                + (isLearning ? (" - " + getFullTranslateWord(questionWord)) : ""))
                        : translations[language].atLast
                    }
                    {isMistake && <Text
                      color={"red"}> {previousQuestionWord.word} - {getFullTranslateWord(previousQuestionWord)}</Text>}
                </Text>
            </Box>

    )
        ;
}