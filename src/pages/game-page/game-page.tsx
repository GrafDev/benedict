import React, {useEffect, useState} from "react";
import {
    Button,
    Flex,
    Grid,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {Question} from "./question";
import {useCommon, useTimer, useUser} from "../../shared/store/zustand";
import {Fade} from "react-awesome-reveal";
import {buttonStyles} from "../../shared/ui/button-style.ts";
import {Answers} from "./answers";
import PreStartBlock from "./pre-start-block/pre-start-block.tsx";
import {Congratulation} from "./congratulation";


const GamePage: React.FC = () => {

    const isStart: boolean = useCommon(state => state.isStart)
    const setLearningWords = useUser(state => state.setLearningWords)
    const setQuestionWord = useUser(state => state.setQuestionWord)
    // const isCongratulations: boolean = useCommon(state => state.isCongratulations)
    const setIsMistake = useUser(state => state.setIsMistake)
    const positionQuestion: string = !isStart ? "auto 1fr" : "1fr auto"
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const colorUI = useUser(store => store.currentUser.colorUI)
    const setIsLearning = useUser(state => state.setIsLearning)
    const changeQuestionWord = useUser(state => state.changeQuestionWord)
    const clearMistakes = useCommon(state => state.clearMistakes)
    const setStartTime = useTimer(state => state.setStartTime)
    const setIsStart = useCommon(state => state.setIsStart)
    const setIsCongratulations = useCommon(state => state.setIsCongratulations)
    const isCongratulations: boolean = useCommon(state => state.isCongratulations)
    const isLearning: boolean = useUser(state => state.isLearning)
    const translations = useUser(state => state.translations)
    const language = useUser(state => state.currentUser.language)
    const [preStart, setPreStart] = useState<boolean>(false)
    const [treeSeconds, setTreeSeconds] = useState<number>(5)
    const [onCancel, setOnCancel] = useState<boolean>(false)
    const {isOpen} = useDisclosure()

    useEffect(() => {
        setIsMistake(false)
        setLearningWords()
        setQuestionWord()
    }, []);

    const _buttonStyles = {
        ...buttonStyles(colorUI),
        w: '90%',
        m: 1,
        pl: 10,
        pr: 10,
        maxWidth: '400px',
    };

    const handlerStart = () => {
        if (!isStart && !onCancel) {
            setPreStart(false)
            setOnCancel(false)
            changeQuestionWord()
            setIsStart(true)
            setStartTime()
            setIsMistake(false)
            setIsCongratulations(false)
            clearMistakes()
        }
    }

    useEffect(() => {
        if (preStart && !onCancel && treeSeconds === 0) {
            handlerStart()
            setTreeSeconds(5)
            setOnCancel(false)
        }
    }, [onCancel, treeSeconds]);


    const handlePreStart = () => {
        setPreStart(true); // Это запланирует обновление состояния
        setTreeSeconds(5);

        const intervalId = setInterval(() => {
            setTreeSeconds((prevSeconds) => {
                if (prevSeconds > 1) {
                    return prevSeconds - 1;
                } else {
                    clearInterval(intervalId);
                    return 0;
                }
            });
        }, 1000);

    }


    const handleClick = ((command: string) => {
        switch (command) {
            case "Game":
                setOnCancel(false);
                handlePreStart()
                break;
            case "Change type":
                setIsLearning(!isLearning)
                break;
            case "Cancel":
                setPreStart(false);
                setOnCancel(true);
                break;
            default:
                break;
        }
    })

    return (
        <Fade>
            <Flex justifyContent={"center"}
                  alignItems={"center"}
                  className={"game-page"}
                  h={"100%"}
            >
                <Grid gridTemplateRows={isOpen ? "" : {
                    base: positionQuestion,
                    sm: positionQuestion,
                    md: "auto 4fr",
                    lg: "auto 4fr",
                    xl: "auto 4fr",
                    "2xl": "auto  4fr"
                }}
                      pb={2}
                      justifySelf={"center"}
                      h={"100%"}
                      gap={2}
                      maxW={isOpen ? "90%" : "720px"}
                      w={'100%'}
                >
                    {(isStart || preStart) &&
                      <Question preStart={preStart}/>}
                    {!isStart && !preStart &&
                      <PreStartBlock handleClick={handleClick}/>
                    }
                    {isStart &&
                      <Answers/>}
                    {!isStart && isCongratulations && !preStart && <Congratulation/>}
                    {!isStart && preStart &&
                      <VStack h={"auto"}
                              mt={8}
                              gap={8}>
                        <Text fontSize={{
                            base: "3xl",
                            sm: "3xl",
                            md: "4xl",
                            lg: "5xl",
                            xl: "6xl",
                            "2xl": "6xl"
                        }}
                              color={isDark ? 'gray.200' : 'black'}
                              pr={3} pl={3}
                              fontWeight={"bold"}
                              maxW={"100%"}
                              align={'center'}>
                            {treeSeconds}
                        </Text>
                        <Button
                            {..._buttonStyles}
                            onClick={() => handleClick("Cancel")}>
                            {translations[language].cancel}
                        </Button>
                      </VStack>
                    }
                </Grid>
            </Flex>
        </Fade>


    )
}

export default GamePage;