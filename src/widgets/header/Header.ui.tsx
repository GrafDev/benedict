import React, {useEffect} from "react";
import {Box, Button, Grid, GridItem, useColorModeValue} from "@chakra-ui/react";
import {DarkSwitcher} from "../../shared/ui";
import {ItemMenu} from "../item-menu";
import {Timer} from "../../shared/ui";
import {useCommon, useUser, useTimer} from "../../shared/store/zustand";
import {FaStop} from "react-icons/fa";
import {useLocation} from "react-router-dom";
import {BGSwitcher} from "../../shared/ui/bg-switcher.tsx";
import {AUTH_LINK, DICTIONARY_LINK, HOME_LINK} from "../../shared/constants-ui.ts";
import {AccountButton} from "../accout-button/account-button.ui.tsx";


export const Header: React.FC = () => {
    const isStart: boolean = useCommon(state => state.isStart)
    const setIsStart = useCommon(state => state.setIsStart)
    const setStartTime = useTimer(state => state.setStartTime)
    const setQuestionWord = useUser(state => state.setQuestionWord)
    const setLearningWords = useUser(state => state.setLearningWords)
    const changeQuestionWord = useUser(state => state.changeQuestionWord)
    const setIsCongratulations = useCommon(state => state.setIsCongratulations)
    const clearMistakes = useCommon(state => state.clearMistakes)
    const isUserDictionary = useUser(store => store.currentUser.isUserDictionary)
    const colorUI = useUser(state => state.currentUser.colorUI)
    const setIsMistake = useUser(state => state.setIsMistake)
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/') {
        }
    }, [location]);

    const handlerStart = () => {
        if (!isStart) {
            changeQuestionWord()
            setIsStart(true)
            setStartTime()
            setIsMistake(false)
            setIsCongratulations(false)
            clearMistakes()
        } else {
            setIsMistake(false)
            setLearningWords()
            setQuestionWord()
            setIsStart(false)
            setStartTime()
        }
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
            <Grid
                templateColumns={"repeat(auto-fit, minmax(100px, 1fr))"}
                h={"100%"}
                w={"100%"}
                maxW={"720px"}
            >
                <Box mr={10}
                     justifySelf={"left"}>
                    <ItemMenu/>

                </Box>

                {location.pathname === '/game-page' &&
                    <Box as={Button}
                         minW={"100px"}
                         display={"flex"}
                         gap={"1vh"}
                         alignItems={"center"}
                         justifyContent={"center"}
                         justifySelf={"center"}
                         border={isDark ? "1px solid " + colorUI : undefined}

                        // border={"2px solid"}
                         m={1}
                         fontSize={{base: "sm", sm: "md", md: "md", lg: "lg", xl: "2xl", "2xl": "3xl"}}
                         colorScheme={colorUI}
                         boxShadow={"md"}
                         pl={6}
                         pr={3}
                         pb={1}
                         pt={1}
                         w={"120px"}
                         rounded={13}
                         _hover={{
                             boxShadow: 'dark-lg',
                             transform: 'scale(1.01)',
                             border: isDark ? "2px solid " + colorUI : undefined
                         }}
                         onClick={handlerStart}>
                        {isStart && location.pathname === '/game-page' &&
                            <Grid templateColumns={"1fr 1fr"} gap={"1vh"}
                                  alignItems={"center"}
                            >
                                <FaStop/>
                                <GridItem alignItems={"center"}
                                          w={"60px"}
                                >
                                    <Timer/>

                                </GridItem>

                            </Grid>
                        }

                        {!isStart && location.pathname === '/game-page' &&
                            "Start"
                        }
                    </Box>}
                {location.pathname !== '/game-page' &&
                    <Box alignContent={"center"}
                         justifySelf={"center"}
                         w={"auto"}>
                        {location.pathname === DICTIONARY_LINK && isUserDictionary && "Users dictionary"}
                        {location.pathname === DICTIONARY_LINK && !isUserDictionary && "Main dictionary"}
                        {location.pathname === HOME_LINK && "Bene-dict"}
                        {location.pathname === AUTH_LINK && "Account"}


                    </Box>
                }
                <Box
                    justifySelf={"end"}>
                    {location.pathname !== AUTH_LINK && <AccountButton/>}
                    <BGSwitcher/>
                    <DarkSwitcher/>

                </Box>


            </Grid>
        </Box>

    );
}

