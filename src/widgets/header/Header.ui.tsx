import React, {useEffect} from "react";
import {Box, Flex, useColorModeValue} from "@chakra-ui/react";
import {ColorSwitcher} from "../../shared/ui/Switcher.tsx";
import {ItemMenu} from "../../shared/ui/ItemMenu.tsx";
import {Timer} from "../../shared/ui/Timer.tsx";
import {useDict} from "../../shared/store/zustand/store.ts";
import {FaStop} from "react-icons/fa";
import {defaultDictionary} from "../../shared/store/constants/defaulDictionary.ts";


export const Header: React.FC = () => {
    const isStart = useDict(state => state.isStart)
    const setIsStart = useDict(state => state.setIsStart)
    const setStartTime = useDict(state => state.setStartTime)
    // const setQuestionWord = useDict(state => state.setQuestionWord)
    const setLearningWords = useDict(state => state.setLearningWords)
    const clearDict = useDict(state => state.clearAnswers)
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';


    const handlerStart = () => {
        //1. The dictionary of the words being studied is filled in
        setLearningWords()
        //2. the default goes to the previous word
        //3. A new word is generated from the dictionary of words being studied
        //4. The new word is removed from the dictionary of words being studied.
        //5. Answers from the default dictionary are filled in, one of which is the previous one
        setIsStart(true)
        setStartTime(new Date().getTime())
    }
    const handlerStop = () => {
        clearDict()
        setIsStart(false)
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

