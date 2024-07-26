import React, {useEffect, useState} from "react";
import {Button,  VStack} from "@chakra-ui/react";
import {nanoid} from "nanoid";
import {useCommonStore, useUserStore, useTimerStore} from "../../../shared/store/zustand";
import {createAnswers} from "../../../features/startGame";
import {getOneTranslateWord} from "../../../features/toGame";
import {defaultVocabulary} from "../../../shared/store/constants-store/vocabularies/vocabulary-2500.ts";
import {buttonStyles} from "../../../shared/ui/button-style.ts";
import AdaptiveText from "../../../components/adaptive-text/adaptive-text.tsx";
import {IVocabularyItem} from "../../../shared/types/vocabulary-types.ts";
import useUI from "../../../shared/hooks/use-ui.tsx";

export const Answers: React.FC = () => {
    const previousQuestionWord: IVocabularyItem = useUserStore(state => state.previousQuestionWord)
    const currentDict: IVocabularyItem[] = useUserStore(state => state.currentVocabulary.vocabulary)
    const learningWords: IVocabularyItem[] = useUserStore(state => state.learningWords)
    const shiftLearningWords = useUserStore(state => state.shiftLearningWords)
    const changeQuestionWord = useUserStore(state => state.changeQuestionWord)
    const setLearningWords = useUserStore(state => state.setLearningWords)
    const setQuestionWord = useUserStore(state => state.setQuestionWord)
    const setIsCongratulations = useCommonStore(state => state.setIsCongratulations)
    const setStartTime = useTimerStore(state => state.setStartTime)
    const setIsStart = useCommonStore(state => state.setIsStart)
    const addMistakes = useCommonStore(state => state.addMistakes)
    const clearMistakes = useCommonStore(state => state.clearMistakes)
    const lastTranslate: boolean = useUserStore(state => state.lastTranslate)
    const [answersWords, setAnswersWords] = useState<IVocabularyItem[]>([])
    const isLearning: boolean = useCommonStore(state => state.isLearning)
    const setIsLearning = useCommonStore(state => state.setIsLearning)
    const {colorUI} = useUI()


    useEffect(() => {
        setAnswersWords(createAnswers(learningWords, currentDict, previousQuestionWord,defaultVocabulary.vocabulary))
    }, [previousQuestionWord]);


    const handler = (word: IVocabularyItem) => {

        if ((word.mean === previousQuestionWord.mean)) {
            clearMistakes()
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
                        w={{base: '90%', sm: '90%', md: '80%', lg: '80%', xl: '80%', "2xl": '80%'}}
                        h={"5vh"}
                        maxW={"720px"}
                        paddingY={1}
                        onMouseUp={() => handler(word)}
                >
                    {/*<Text*/}
                    {/*    fontSize={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "lg", "2xl": "xl"}}*/}
                    {/*    pr={3} pl={3}*/}
                    {/*    maxW={"100%"}*/}
                    {/*    align={'center'}*/}
                    {/*    overflowWrap="break-word"*/}
                    {/*    wordBreak="break-word"*/}
                    {/*    whiteSpace="normal"*/}
                    {/*>*/}

                    {/*    {!lastTranslate ? getOneTranslateWord(word) : word.mean}*/}
                    {/*</Text>*/}

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