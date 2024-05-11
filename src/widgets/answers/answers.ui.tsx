import React, {useEffect, useState} from "react";
import {Button, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import {nanoid} from "nanoid";
import {IDictionaryItem} from "../../shared/types.ts";
import {useCommon, useUser, useTimer} from "../../shared/store/zustand";
import {createAnswers} from "../../features/startGame";
import {getOneTranslateWord} from "../../features/toGame";

export const Answers: React.FC = () => {
    const previousQuestionWord: IDictionaryItem = useUser(state => state.previousQuestionWord)
    const currentDict: IDictionaryItem[] = useUser(state => state.currentDict)
    const learningWords: IDictionaryItem[] = useUser(state => state.learningWords)
    const shiftLearningWords = useUser(state => state.shiftLearningWords)
    const changeQuestionWord = useUser(state => state.changeQuestionWord)
    const setLearningWords = useUser(state => state.setLearningWords)
    const setQuestionWord = useUser(state => state.setQuestionWord)
    const setIsCongratulations = useCommon(state => state.setIsCongratulations)
    const setStartTime = useTimer(state => state.setStartTime)
    const setIsStart = useCommon(state => state.setIsStart)
    const addMistakes = useCommon(state => state.addMistakes)
    const lastTranslate: boolean = useUser(state => state.lastTranslate)
    const colorUI = useUser(state => state.currentUser.colorUI)
    const setIsMistake = useUser(state => state.setIsMistake)
const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const [answersWords, setAnswersWords] = useState<IDictionaryItem[]>([])

    useEffect(() => {
        console.log("answersWords useEffect", answersWords)
        setAnswersWords(createAnswers(learningWords, currentDict, previousQuestionWord))
    }, [previousQuestionWord]);


    const handler = (word: IDictionaryItem) => {

        if ((word.word === previousQuestionWord.word)) {
            setIsMistake(false)

            if (learningWords.length > 1) {
                shiftLearningWords()
                changeQuestionWord()
            } else {
                setLearningWords()
                setQuestionWord()
                setIsStart(false)
                setStartTime()
                setIsCongratulations(true)
            }
        } else {
            setIsMistake(true)
            addMistakes()
        }
    }


    return (
        <VStack as="main"
                gap={"1vh"}
                justifyContent={{base: "end", sm: "end", md: "start", lg: "start", xl: "start", "2xl": "start"}}
                pb={6}
        >
            {answersWords.slice(0, 10).map((word: IDictionaryItem, index: number) => (

                <Button key={nanoid(index)}

                        w={'80%'}
                        maxW={"720px"}
                        rounded={20}
                        h={"5vh"}
                        boxShadow={"md"}
                        onMouseUp={() => handler(word)}
                        colorScheme={isDark?undefined:colorUI}
                        border={isDark?"1px solid "+colorUI:undefined}
                        _hover={{
                            boxShadow: "dark-lg",
                            transform: 'scale(1.01)',
                            border:isDark?"2px solid "+colorUI:undefined


                        }}
                        _active={{
                            transform: 'scale(0.97)',
                        }}
                >
                    <Text
                        fontSize={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "2xl", "2xl": "3xl"}}
                        pr={3} pl={3}
                        maxW={"100%"}
                        align={'center'}
                    >
                        {!lastTranslate ? getOneTranslateWord(word) : word.word}
                    </Text>
                </Button>
            ))
            }

        </VStack>
    )
}