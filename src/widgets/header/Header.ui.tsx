import React, {useEffect} from "react";
import {Box, Button, Grid, GridItem, useColorModeValue, useDisclosure, useMediaQuery} from "@chakra-ui/react";
import {DarkSwitcher} from "../../shared/ui";
import {ItemMenu} from "./item-menu";
import {Timer} from "../../shared/ui";
import {useCommon, useUser, useTimer} from "../../shared/store/zustand";
import {FaStop} from "react-icons/fa";
import {useLocation} from "react-router-dom";
import {BGSwitcher} from "../../shared/ui/bg-switcher.tsx";
import {AUTH_LINK, DICTIONARY_LINK, HOME_LINK} from "../../shared/constants-link.ts";
import {LanguageSwitcher} from "./language-switcher";
import AdaptiveText from "../../components/adaptive-text/adaptive-text.tsx";
import {ModalCommon} from "../../components/modal/modal-common.tsx";
import {buttonStyles} from "../../shared/ui/button-style.ts";

const Header: React.FC = () => {
    const isStart: boolean = useCommon(state => state.isStart)
    const setIsStart = useCommon(state => state.setIsStart)
    const setStartTime = useTimer(state => state.setStartTime)
    const setQuestionWord = useUser(state => state.setQuestionWord)
    const setLearningWords = useUser(state => state.setLearningWords)
    const colorUI = useUser(state => state.currentUser.colorUI)
    const setIsMistake = useUser(state => state.setIsMistake)
    const setIsLearning = useUser(state => state.setIsLearning)
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const location = useLocation()
    const translations = useUser(state => state.translations)
    const language = useUser(state => state.currentUser.language)
    const currentVocabulary = useUser(state => state.currentVocabulary)

    const {isOpen, onOpen, onClose} = useDisclosure()

    useEffect(() => {
        if (location.pathname === '/') {
        }
    }, [location]);
    const [isBelow400px] = useMediaQuery("(max-width: 400px)");

    const handlerRenameVocabulary = () => {
        onOpen()
    }

    const handlerButton = () => {
        if (isStart) {
            setIsLearning(false)
            setIsMistake(false)
            setLearningWords()
            setQuestionWord()
            setIsStart(false)
            setStartTime()
        }
    }


    return (
        <Box display="flex"
             justifyContent="center"
             alignItems="center"
             background={isDark ? 'rgba(10, 10, 10, 0.95)' : 'rgba(250, 250, 250, 0.95)'}
             fontSize={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "large", "2xl": "large"}}
             boxShadow={"md"}
        >

            <Grid
                templateColumns={"repeat(auto-fit, minmax(100px, 1fr))"}
                h={"100%"}
                w={"100%"}
                maxW={"1024px"}
            >
                <Box mr={10}
                     justifySelf={"left"}>
                    <ItemMenu/>


                </Box>

                {location.pathname === '/game-page' && isStart &&
                  <Box as={Button}
                       {...buttonStyles(colorUI)}
                       minW={"150px"}
                       display={"flex"}
                       alignItems={"center"}
                       justifyContent={"center"}
                       justifySelf={"center"}

                       m={2}
                       onClick={handlerButton}>
                      {isStart && location.pathname === '/game-page' &&
                        <Grid templateColumns={"1fr auto"} gap={"1vh"}
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

                      {/*{!isStart && location.pathname === '/game-page' &&*/}
                      {/*    "Start"*/}
                      {/*}*/}
                  </Box>}
                {location.pathname !== '/game-page' &&
                  <Box alignContent={"center"}
                       justifySelf={"center"}
                       textAlign={"center"}
                       w={"auto"}
                       p={1}
                  >
                      {location.pathname === DICTIONARY_LINK &&
                          (
                              currentVocabulary.id !== "default"
                                  ? <Button colorScheme={colorUI} variant='link'
                                            onClick={() => handlerRenameVocabulary()}>
                                      <AdaptiveText initialFontSize={16} text={currentVocabulary.name}/>
                                  </Button>
                                  : <AdaptiveText initialFontSize={16} text={currentVocabulary.name}/>
                          )
                      }
                      {location.pathname === HOME_LINK && "Bene-dict"}
                      {location.pathname === AUTH_LINK && translations[language].account}


                  </Box>
                }
                <ModalCommon isOpen={isOpen} onClose={onClose} optionsModal={"renameVocabulary"}/>
                <Box
                    justifySelf={"end"}>
                    {/*{location.pathname !== AUTH_LINK && <AccountButton/>}*/}
                    <LanguageSwitcher/>
                    {isBelow400px ? null : <BGSwitcher/>}
                    <DarkSwitcher/>
                </Box>


            </Grid>
        </Box>

    );
}

export default Header;
