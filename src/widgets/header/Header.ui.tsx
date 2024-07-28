import React, {useEffect} from "react";
import {Box, Button, Grid, GridItem, useDisclosure, useMediaQuery} from "@chakra-ui/react";
import {DarkSwitcher} from "../../shared/ui";
import {ItemMenu} from "./item-menu";
import {Timer} from "../../shared/ui";
import {useCommonStore, useUserStore, useTimerStore} from "../../shared/store/zustand";
import {FaStop} from "react-icons/fa";
import {useLocation} from "react-router-dom";
import {BGSwitcher} from "../../shared/ui/bg-switcher.tsx";
import {AUTH_ROUTE, VOCABULARY_ROUTE, HOME_ROUTE} from "../../shared/constants";
import {LanguageSwitcher} from "./language-switcher";
import AdaptiveText from "../../components/adaptive-text/adaptive-text.tsx";
import {ModalCommon} from "../../components/modal/modal-common.tsx";
import useUI from "../../shared/hooks/use-ui.tsx";

const Header: React.FC = () => {
    const {isDark,colorElement, translations,buttonStyle,language,colorUI}=useUI()
    const isStart: boolean = useCommonStore(state => state.isStart)
    const setIsStart = useCommonStore(state => state.setIsStart)
    const setStartTime = useTimerStore(state => state.setStartTime)
    const setQuestionWord = useUserStore(state => state.setQuestionWord)
    const setLearningWords = useUserStore(state => state.setLearningWords)
    const clearMistakes = useCommonStore(state => state.clearMistakes)
    const setIsLearning = useCommonStore(state => state.setIsLearning)
    const location = useLocation()
    const currentVocabulary = useUserStore(state => state.currentVocabulary)


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
            clearMistakes()
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
             backgroundColor={`${isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'}`}
             backdropFilter="blur(10px)"
             fontSize={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "large", "2xl": "large"}}
             minH={"50px"}
             boxShadow={isDark ? "0 8px 8px 0 rgba(0, 0, 0, 0.37)" : "0 8px 8px 0 rgba(91, 114, 120, 0.37)"}
             border="1px solid rgba(255, 255, 255, 0.18)"
             zIndex={5}
        >

            <Grid
                templateColumns={"repeat(auto-fit, minmax(100px, 1fr))"}
                h={"100%"}
                w={"100%"}
                maxW={"1024px"}
                alignItems={"center"}
            >
                <Box mr={10}
                     justifySelf={"left"}>
                    <ItemMenu/>


                </Box>

                {location.pathname === '/game-page' && isStart &&
                  <Box as={Button}
                       {...buttonStyle}
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
                  </Box>}
                {location.pathname !== '/game-page' &&
                  <Box alignContent={"center"}
                       justifySelf={"center"}
                       textAlign={"center"}
                       w={"auto"}
                       p={1}
                  >
                      {location.pathname === VOCABULARY_ROUTE &&
                          (
                              currentVocabulary.id !== "default"
                                  ? <Box as={Button} colorScheme={colorUI} variant='link'
                                            onClick={() => handlerRenameVocabulary()}>
                                      <AdaptiveText initialFontSize={16} text={currentVocabulary.name}/>
                                  </Box>
                                  : <Box textColor={colorElement}>
                                      <AdaptiveText initialFontSize={16} text={currentVocabulary.name}/>
                                  </Box>
                          )
                      }
                      {location.pathname === HOME_ROUTE && "Bene-dict"}
                      {location.pathname === AUTH_ROUTE && translations[language].account}


                  </Box>
                }
                <ModalCommon isOpen={isOpen} onClose={onClose} optionsModal={"renameVocabulary"}/>
                <Box
                    justifySelf={"end"}
                >
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
