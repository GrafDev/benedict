import React from "react";
import {Box, Flex, useColorModeValue} from "@chakra-ui/react";
import {ColorSwitcher} from "../../shared/ui/Switcher.tsx";
import {ItemMenu} from "../../shared/ui/ItemMenu.tsx";
import {Timer} from "../../shared/ui/Timer.tsx";
import {useDict} from "../../shared/store/zustand/store.ts";
import {FaStop} from "react-icons/fa";
import {createQuestionWord} from "../../features/startGame";
import {createFirstQuestionWord} from "../../features/goGamePage";


export const Header: React.FC = () => {
    const isStart = useDict(state => state.isStart)
    const learningWords = useDict(state => state.learningWords)
    const setIsStart = useDict(state => state.setIsStart)
    const setStartTime = useDict(state => state.setStartTime)
    const setPreviousQuestionWord = useDict(state => state.setPreviousQuestionWord)
    const setQuestionWord = useDict(state => state.setQuestionWord)
    const setLearningWords = useDict(state => state.setLearningWords)
    const setAnswers = useDict(state => state.setAnswers)

    const getStartTime = useDict(state => state.getStartTime)
    const getPreviousQuestionWord = useDict(state => state.getPreviousQuestionWord)
    const getLearningWords = useDict(state => state.getLearningWords)

    const removeQuestionWordFromLearningWords = useDict(state => state.removeQuestionWordFromLearningWords)

    // const setQuestionWord = useDict(state => state.setQuestionWord)
    const clearAnswers = useDict(state => state.clearAnswers)
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';


    const handlerStart = () => {
        setPreviousQuestionWord() //2. the default word goes to the previous word
        setQuestionWord(createQuestionWord(learningWords)) //3. A new word is generated from the dictionary of words being studied
        removeQuestionWordFromLearningWords() //4. The new word is removed from the dictionary of words being studied.

        setAnswers(getPreviousQuestionWord()) //5. Answers from the default dictionary are filled in, one of which is the previous one
        setIsStart(true)
        setStartTime(new Date().getTime())
        // выведи в консоль getStartTime в виде даты
        console.log(new Date(getStartTime()).toLocaleString())
        console.log(getLearningWords())
    }
    const handlerStop = () => {
        clearAnswers()
        setIsStart(false)
        setLearningWords() //1. The dictionary of the words being studied is filled in

        setQuestionWord(createFirstQuestionWord(getLearningWords())) //3. A new word is generated from the dictionary of words being studied
        setStartTime(new Date().getTime())

        console.log(new Date(getStartTime()).toLocaleString())
        console.log(getLearningWords())
    }

    return (
        <Box as={"header"} display="flex" justifyContent="center" alignItems="center"
             background={'gray800'}
             boxShadow={"md"}
        >
            <Flex
                justify={"space-between"}
                align={"center"}
                h={"100%"}
                w={"100%"}
                p={1}
                wrap={"nowrap"}
                maxW={"720px"}
            >
                <ItemMenu/>
                {isStart &&
                    <Box as={"button"}
                         display={"flex"}
                         gap={"1vh"}
                         alignItems={"center"}
                         justifyItems={"space-between"}
                         fontSize={{base: "sm", sm: "md", md: "md", lg: "lg", xl: "2xl", "2xl": "3xl"}}
                         background={isDark ? 'gray.700' : 'gray.200'}
                         pr={3}
                         pl={3}
                         rounded={5}
                         onClick={handlerStop}>

                        <FaStop/>
                        <Timer/>
                    </Box>}
                {!isStart &&
                    <Box as={"button"}
                         fontSize={{base: "sm", sm: "md", md: "md", lg: "lg", xl: "2xl", "2xl": "3xl"}}
                         background={isDark ? 'gray.700' : 'gray.200'}
                         pr={3}
                         pl={3}
                         rounded={5}
                         onClick={handlerStart}>

                        Start
                    </Box>}
                <ColorSwitcher/>
            </Flex>
        </Box>

    );
}

