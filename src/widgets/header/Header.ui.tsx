import React, {useEffect} from "react";
import {Box, Flex, useColorModeValue} from "@chakra-ui/react";
import {ColorSwitcher} from "../../shared/ui/Switcher.tsx";
import {ItemMenu} from "../item-menu";
import {Timer} from "../../shared/ui/Timer.tsx";
import {useCommon, useDict, useTimer, useUI} from "../../shared/store/zustand";
import {FaStop} from "react-icons/fa";
import {useLocation} from "react-router-dom";


export const Header: React.FC = () => {
    const isStart:boolean = useCommon(state => state.isStart)
    const setIsStart = useCommon(state => state.setIsStart)
    const setStartTime = useTimer(state => state.setStartTime)
    const setQuestionWord = useDict(state => state.setQuestionWord)
    const setLearningWords = useDict(state => state.setLearningWords)
    const changeQuestionWord = useDict(state => state.changeQuestionWord)
    const setIsCongratulations = useCommon(state => state.setIsCongratulations)
    const clearMistakes = useCommon(state => state.clearMistakes)
    const backgroundColor: { dark: string, light: string } = useUI(store => store.backgroundColor)

    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/') {

        }
    }, [location]);

    const handler = () => {
        if (!isStart) {
            changeQuestionWord()
            setIsStart(true)
            setStartTime()
            setIsCongratulations(false)
            clearMistakes()
        } else {
            setLearningWords()
            setQuestionWord()
            setIsStart(false)
            setStartTime()
        }
        console.log(location)
    }


    return (
        <Box as={"header"}
             display="flex"
             justifyContent="center"
             alignItems="center"
             background={isDark ? 'rgba(10, 10, 10, 0.95)' : 'rgba(250, 250, 250, 0.95)'}
             fontSize={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "x-large", "2xl": "x-large"}}
             boxShadow={"md"}
        >
            <Flex
                justify={"space-between"}
                align={"center"}
                h={"100%"}
                w={"100%"}
                wrap={"nowrap"}
                maxW={"720px"}
            >
                <ItemMenu/>
                {location.pathname === '/game-page' &&
                    <Box as={"button"}
                         display={"flex"}
                         gap={"1vh"}
                         alignItems={"center"}
                         border={isDark ? '1px solid #A0AEC0' : '1px solid #718096'}
                         justifyItems={"space-between"}
                         p={1}
                         fontSize={{base: "sm", sm: "md", md: "md", lg: "lg", xl: "2xl", "2xl": "3xl"}}
                         background={isDark ? backgroundColor.dark : backgroundColor.light}
                         pr={3}
                         pl={3}
                         rounded={5}
                         onClick={handler}>
                        {isStart && location.pathname === '/game-page' &&
                            <Box display={"flex"}
                                 gap={"1vh"}
                                 alignItems={"center"}
                            >
                                <FaStop/>
                                <Timer/>
                            </Box>
                        }

                        {!isStart && location.pathname === '/game-page' &&
                            "Start"
                        }
                    </Box>}
                {location.pathname !== '/game-page' &&
                    "Bene-dict"
                }
                <ColorSwitcher/>
            </Flex>
        </Box>

    );
}

