import React, {useEffect, useState} from "react";
import {Button,  VStack} from "@chakra-ui/react";
import {nanoid} from "nanoid";
import {useCommonStore, useUserStore, useTimerStore} from "../../../shared/store/zustand";
import {createAnswers} from "../../../features/startGame";
import {getOneTranslateWord} from "../../../features/toGame";
import AdaptiveText from "../../../components/adaptive-text/adaptive-text.tsx";
import {IVocabularyItem} from "../../../shared/types/vocabulary-types.ts";
import useOptions from "../../../shared/hooks/use-options.tsx";
import useVocabulary from "../../../shared/hooks/use-vocabulary.tsx";
import {DEFAULT_VOCABULARY} from "../../../shared/constants";

export const Answers: React.FC = () => {
    const previousQuestionWord: IVocabularyItem = useUserStore(state => state.previousQuestionWord)
    const learningWords: IVocabularyItem[] = useUserStore(state => state.learningWords)
    const shiftLearningWords = useUserStore(state => state.shiftLearningWords)
    const changeQuestionWord = useUserStore(state => state.changeQuestionWord)
    const setLearningWords = useUserStore(state => state.setLearningWords)
    const setQuestionWord = useUserStore(state => state.setQuestionWord)
    const setIsCongratulations = useCommonStore(state => state.setIsCongratulations)
    const setStartTime = useTimerStore(state => state.setStartTime)
    const setIsStart = useCommonStore(state => state.setIsStart)
    const addMistakes = useCommonStore(state => state.addMistakes)
    const setMistake = useCommonStore(state => state.setMistake)
    const lastTranslate: boolean = useUserStore(state => state.lastTranslate)
    const [answersWords, setAnswersWords] = useState<IVocabularyItem[]>([])
    const isLearning: boolean = useCommonStore(state => state.isLearning)
    const setIsLearning = useCommonStore(state => state.setIsLearning)
    const {buttonStyle} = useOptions()
    const {currentVocabulary} = useVocabulary()


    useEffect(() => {
        setAnswersWords(createAnswers(learningWords, currentVocabulary.vocabulary, previousQuestionWord,DEFAULT_VOCABULARY.vocabulary))
    }, [previousQuestionWord]);


    const handler = (word: IVocabularyItem) => {
        if ((word.mean === previousQuestionWord.mean)) {
            if (learningWords.length > 1) {
                setMistake(false)
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
            console.log("mistake")
            setMistake(true)
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
                    {...buttonStyle}
                        w={{base: '90%', sm: '90%', md: '80%', lg: '80%', xl: '80%', "2xl": '80%'}}
                        h={"5vh"}
                        maxW={"720px"}
                        paddingY={1}
                        onMouseUp={() => handler(word)}
                >

                    <AdaptiveText weightFont={"bold"}
                                  initialFontSize = {Number(...Object.values({base: 16, sm: 16, md: 20, lg: 24, xl: 24, "2xl": 24}))}
                                  maxHeight={Number(...Object.values({base: 30, sm: 30, md: 30, lg: 40, xl: 40, "2xl": 40}))}
                                  minFontSize = {Number(...Object.values({base: 8, sm: 10, md: 12, lg: 16, xl: 16, "2xl": 16}))}
                                  text={!lastTranslate ? getOneTranslateWord(word) : word.mean}/>
                </Button>
            ))
            }

        </VStack>
    )
}