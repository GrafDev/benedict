import React, {useEffect, useState} from "react";
import {Button, Text, VStack} from "@chakra-ui/react";
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
                    // background={word.word === previousQuestionWord.word ? 'teal.700' : 'red.600'}//OD:need delete
                    // later
                        colorScheme={colorUI}
                    // background={isDark ? 'rgba(10, 10, 10, 1)' : 'rgba(250, 250, 250, 1)'}
                        _hover={{
                            // border: isDark ? '1px solid #F7FAFC' : '1px solid #1A202C',
                            // background: isDark ? 'rgba(20, 20, 20, 0.9)' : 'rgba(255, 255, 255, 1)',
                            boxShadow: "dark-lg",
                            transform: 'scale(1.01)',
                        }}
                        _active={{
                            // background:(word.id === previousQuestionWord.id) ? `teal.700` : `red.600`,
                            transform: 'scale(0.97)',
                        }}
                        h={"5vh"}
                        boxShadow={"md"}
                    // border={"2px solid"}
                        onMouseUp={() => handler(word)}
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