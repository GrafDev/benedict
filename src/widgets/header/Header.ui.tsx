import React from "react";
import {Box, Flex, useColorModeValue} from "@chakra-ui/react";
import {ColorSwitcher} from "../../shared/ui/Switcher.tsx";
import {ItemMenu} from "../../shared/ui/ItemMenu.tsx";
import {Timer} from "../../shared/ui/Timer.tsx";
import {useDict} from "../../shared/store/zustand/store.ts";
import {FaStop} from "react-icons/fa";
import {createQuestionWord} from "../../features/startGame/createQuestionWord.ts";
import {createFirstQuestionWord} from "../../features/goGamePage";


export const Header: React.FC = () => {
    const isStart = useDict(state => state.isStart)
    const learningWords = useDict(state => state.learningWords)
    const defaultDict = useDict(state => state.defaultDict)
    const setIsStart = useDict(state => state.setIsStart)
    const setStartTime = useDict(state => state.setStartTime)
    const setPreviousQuestionWord = useDict(state => state.setPreviousQuestionWord)
    const setQuestionWord = useDict(state => state.setQuestionWord)
    // const setQuestionWord = useDict(state => state.setQuestionWord)
    const clearDict = useDict(state => state.clearAnswers)
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';


    const handlerStart = () => {

        //2. the default goes to the previous word
        setPreviousQuestionWord()
        //3. A new word is generated from the dictionary of words being studied
        setQuestionWord(createQuestionWord(learningWords))
        //4. The new word is removed from the dictionary of words being studied.
        //5. Answers from the default dictionary are filled in, one of which is the previous one
        setIsStart(true)
        setStartTime(new Date().getTime())
    }
    const handlerStop = () => {
        clearDict()
        setIsStart(false)
        setQuestionWord(createFirstQuestionWord(defaultDict)) // 1. Create default word from defaulDictionary
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

