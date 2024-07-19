import React, {useEffect, useState} from "react";
import {Button, Text, VStack} from "@chakra-ui/react";
import {nanoid} from "nanoid";
import { IVocabularyItem} from "../../../shared/types.ts";
import {useCommon, useUser, useTimer} from "../../../shared/store/zustand";
import {createAnswers} from "../../../features/startGame";
import {getOneTranslateWord} from "../../../features/toGame";
import {defaultVocabulary} from "../../../shared/store/constants-store/vocabularies/vocabulary-2500.ts";
import {buttonStyles} from "../../../shared/ui/button-style.ts";

export const Answers: React.FC = () => {
    const previousQuestionWord: IVocabularyItem = useUser(state => state.previousQuestionWord)
    const currentDict: IVocabularyItem[] = useUser(state => state.currentVocabulary.vocabulary)
    const learningWords: IVocabularyItem[] = useUser(state => state.learningWords)
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
    const [answersWords, setAnswersWords] = useState<IVocabularyItem[]>([])
    const setIsLearning = useUser(state => state.setIsLearning)
    const isLearning: boolean = useUser(state => state.isLearning)


    useEffect(() => {
        setAnswersWords(createAnswers(learningWords, currentDict, previousQuestionWord,defaultVocabulary.vocabulary))
    }, [previousQuestionWord]);


    const handler = (word: IVocabularyItem) => {

        if ((word.mean === previousQuestionWord.mean)) {
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
        setIsLearning(isLearning)
    }


    return (
        <VStack as="main"
                gap={"2"}
                justifyContent={{base: "end", sm: "end", md: "start", lg: "start", xl: "start", "2xl": "start"}}
                pb={6}
        >
            {answersWords.slice(0, 10).map((word: IVocabularyItem, index: number) => (

                <Button key={nanoid(index)}
                    {...buttonStyles(colorUI)}
                        w={{base: '90%', sm: '90%', md: '70%', lg: '70%', xl: '70%', "2xl": '60%'}}
                        h={"5vh"}
                        maxW={"720px"}
                        onMouseUp={() => handler(word)}
                >
                    <Text
                        fontSize={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "xl", "2xl": "2xl"}}
                        pr={3} pl={3}
                        maxW={"100%"}
                        align={'center'}
                    >
                        {!lastTranslate ? getOneTranslateWord(word) : word.mean}
                    </Text>
                </Button>
            ))
            }

        </VStack>
    )
}