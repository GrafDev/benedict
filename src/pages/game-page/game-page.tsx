import React, {useEffect, useState} from "react";
import {Button, Grid, HStack, Switch, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import {Answers} from "../../widgets/answers";
import {Question} from "../../widgets/question";
import {useCommon, useTimer, useUser} from "../../shared/store/zustand";
import {Congratulation} from "../../widgets/congratulation";


export const GamePage: React.FC = () => {

    const isStart: boolean = useCommon(state => state.isStart)
    const setLearningWords = useUser(state => state.setLearningWords)
    const setQuestionWord = useUser(state => state.setQuestionWord)
    const isCongratulations: boolean = useCommon(state => state.isCongratulations)
    const setCurrentDict = useUser(state => state.setCurrentDict)
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
    const isLearning: boolean = useUser(state => state.isLearning)
    const translations = useUser(state => state.translations)
    const language = useUser(state => state.currentUser.language)
    const [preStart, setPreStart] = useState<boolean>(false)
    const [treeSeconds, setTreeSeconds] = useState<number>(5)
    const [onCancel, setOnCancel] = useState<boolean>(false)


    useEffect(() => {
        setCurrentDict()
        setIsMistake(false)
        setLearningWords()
        setQuestionWord()

    }, []);

    const buttonStyles = {
        w: '90%',
        minW: '200px',
        rounded: 100,
        m: 1,
        pl: 10,
        pr: 10,
        colorScheme: colorUI,
        width: 'fit-content',
        maxWidth: '400px',
        boxShadow: 'md',
        // border: '2px solid',
        _hover: {
            // background: isDark ? 'gray.800' : 'gray.300',
            boxShadow: 'dark-lg',
            transform: 'scale(1.03)',
            border: isDark ? "2px solid " + colorUI : undefined
        },
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

    useEffect(() => {
        if (preStart && !onCancel && treeSeconds === 0) {
            handlerStart()
            setTreeSeconds(5)
            setOnCancel(false)
        }
    }, [onCancel, treeSeconds]);


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

        <Grid gridTemplateRows={{
            base: positionQuestion,
            sm: positionQuestion,
            md: "auto 4fr",
            lg: "auto 4fr",
            xl: "auto 4fr",
            "2xl": "auto  4fr"
        }}
              h={"100%"}
              gap={2}
              maxW={"720px"}
              w={'100%'}
              justifySelf={'center'}
        >
            {(isStart || preStart) && <Question preStart={preStart}/>}
            {!isStart && !preStart &&
                <VStack h={"auto"} mt={20}
                        width={"40%"}
                        justifySelf={"center"}
                        gap={4}
                        alignItems={"center"}
                        background={isDark ? "rgba(0, 0, 0, 0.30)" : "rgba(250, 250, 250, 0.3)"}
                        p={5}
                        rounded={10}
                >
                    <Button
                        {...buttonStyles}
                        onClick={() => handleClick("Game")}>
                        {isLearning ? translations[language].training : translations[language].learn}
                    </Button>
                    <HStack justifyContent={"center"}
                            alignItems={"center"}
                    >
                        <Switch
                            mt={5}
                            size="md"
                            colorScheme={colorUI}
                            fontSize={{base: "small", sm: "small", md: "sm", lg: "md", xl: "md", "2xl": "md"}}
                            onChange={() => handleClick("Change type")}/>
                        <Text alignSelf={"end"}>
                            {isLearning ? translations[language].pressToGame : translations[language].pressToTraining}
                        </Text>
                    </HStack>
                </VStack>
            }
            {isStart && <Answers/>};
            {!isStart && isCongratulations && !preStart && <Congratulation/>};
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
                        {...buttonStyles}
                        onClick={() => handleClick("Cancel")}>
                        {translations[language].cancel}
                    </Button>
                </VStack>
            }
        </Grid>

    )
}