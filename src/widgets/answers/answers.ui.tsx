import {useEffect, useState} from "react";
import {Button, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import {nanoid} from "nanoid";
import {IDictionaryItem} from "../../shared/types.ts";
import {useCommon, useDict, useTimer} from "../../shared/store/zustand/store.ts";
import {createAnswers} from "../../features/startGame";

export const Answers: React.FC = () => {
    const setQuestionWord = useDict(state => state.setQuestionWord)
    const previousQuestionWord: IDictionaryItem = useDict(state => state.previousQuestionWord)
    const questionWord: IDictionaryItem = useDict(state => state.questionWord)
    const learningWords: IDictionaryItem[] = useDict(state => state.learningWords)
    const defaultDict: IDictionaryItem[] = useDict(state => state.defaultDict)
    const shiftLearningWords = useDict(state => state.shiftLearningWords)
    const setPreviousQuestionWord = useDict(state => state.setPreviousQuestionWord)

    const setStartTime = useTimer(state => state.setStartTime)
    const setIsStart = useCommon(state => state.setIsStart)


    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';

    const [answersWords, setAnswersWords] = useState<IDictionaryItem[]>([])


    useEffect(() => {
        setQuestionWord()
        console.log([...learningWords, ...defaultDict], previousQuestionWord, questionWord)
        setAnswersWords(createAnswers([...learningWords, ...defaultDict], previousQuestionWord, questionWord))
    }, [previousQuestionWord]);

    const handler = (word: IDictionaryItem) => {
        if (word.id === previousQuestionWord.id) {
            if (learningWords.length > 1) {
                shiftLearningWords()
                setPreviousQuestionWord()
            } else {
                setAnswersWords([])
                setIsStart(false)
                setStartTime(new Date().getTime())

            }

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
                        rounded={100}
                        background={word.id === previousQuestionWord.id ? 'teal.700' : 'red.600'}//OD:need delete later

                    // background={isDark ? 'rgba(10, 10, 10, 0.8)' : 'rgba(250, 250, 250, 0.9)'}
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
            <Button>
               {previousQuestionWord.word} -- {questionWord.word} -- {learningWords.length}
            </Button>
            {learningWords.map((word:IDictionaryItem)=>(
               <Text key={nanoid()}> -{word.word}</Text>
            ))}

        </VStack>
    )
}