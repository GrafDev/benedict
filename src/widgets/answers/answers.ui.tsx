import React, {useEffect, useState} from "react";
import {Button, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import {nanoid} from "nanoid";
import {IDictionaryItem} from "../../shared/types.ts";
import {useDict} from "../../shared/store/zustand/store.ts";

export const Answers: React.FC = () => {
    const answers: IDictionaryItem[] = useDict(state => state.answers)
    const isStart: boolean = useDict(state => state.isStart)
    const clearAnswers = useDict(state => state.clearAnswers)
    const previousQuestionWord = useDict(state => state.previousQuestionWord)
    const setStartTime = useDict(state => state.setStartTime)
    const setLearningWords = useDict(state => state.setLearningWords)
    const setPreviousQuestionWord = useDict(state => state.setPreviousQuestionWord) //1. The previous word is saved in the state
    const setAnswers = useDict(state => state.setAnswers)
    const setQuestionWord = useDict(state => state.setQuestionWord)
    const setIsStart = useDict(state => state.setIsStart)
    const getLearningWords = useDict(state => state.getLearningWords)
    const getQuestionWord = useDict(state => state.getQuestionWord)
    const getStartTime = useDict(state => state.getStartTime)
    const [_answerWords, _setAnswersWords] = useState<IDictionaryItem[]>([])
    const [_previousQuestionWord, _setPreviousQuestionWord] = useState<IDictionaryItem>(previousQuestionWord)
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';


    useEffect(
        () => {
            _setAnswersWords(answers)
        }
    ), [isStart, answers]

    useEffect(() => {
        _setPreviousQuestionWord(previousQuestionWord)
    }, [previousQuestionWord]);

    const handler = (word: IDictionaryItem) => {
        if (word.id === previousQuestionWord.id) {
            setPreviousQuestionWord()
            if (getLearningWords().length > 0) {
                setQuestionWord()
                setAnswers()
                console.log("previous: ", _previousQuestionWord)
                console.log("question:", getQuestionWord())
                console.log(getLearningWords())
            } else {
                clearAnswers()
                setIsStart(false)
                setLearningWords() //1. The dictionary of the words being studied is filled in
                setQuestionWord()
                setStartTime(new Date().getTime())

                console.log(new Date(getStartTime()).toLocaleString())
                console.log(getLearningWords())
            }

        }

    }


    return (
        <VStack as="main"
                gap={"1vh"}
                justifyContent={{base: "end", sm: "end", md: "start", lg: "start", xl: "start", "2xl": "start"}}
                pb={6}
        >
            {_answerWords.slice(0, 10).map((word: IDictionaryItem, index: number) => (

                <Button key={nanoid(index)}

                        w={'80%'}
                        maxW={"720px"}
                        rounded={100}
                        background={isDark ? 'rgba(10, 10, 10, 0.8)' : 'rgba(250, 250, 250, 0.9)'}
                        border={isDark ? '1px solid #A0AEC0' : '1px solid #718096'}
                        _hover={{
                            border: isDark ? '1px solid #F7FAFC' : '1px solid #1A202C',
                            background: isDark ? 'rgba(20, 20, 20, 0.9)' : 'rgba(255, 255, 255, 1)',
                            transform: isDark ? 'scale(1.03)' : 'scale(1.02)',
                        }}

                        _active={{
                            background: (word.id === previousQuestionWord.id) ? 'teal.700' : 'red.600',
                            transform: 'scale(0.97)',
                        }}
                        h={"5vh"}
                        boxShadow={"md"}
                        onClick={() => handler(word)}
                >
                    <Text
                        fontSize={{base: "sm", sm: "md", md: "md", lg: "lg", xl: "2xl", "2xl": "3xl"}}
                        pr={3} pl={3}
                        maxW={"100%"}
                        align={'center'}
                    >
                        {word.word}
                    </Text>
                </Button>
            ))
            }
        </VStack>
    )
}