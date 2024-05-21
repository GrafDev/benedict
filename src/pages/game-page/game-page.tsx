import React, {useEffect} from "react";
import {Button, Grid,  useColorModeValue, VStack} from "@chakra-ui/react";
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
        width: 'auto',
        maxWidth: '300px',
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
        if (!isStart) {
            changeQuestionWord()
            setIsStart(true)
            setStartTime()
            setIsMistake(false)
            setIsCongratulations(false)
            clearMistakes()
        }
    }

    const handleClick = ((command: string) => {
        switch (command) {
            case "Game":
                handlerStart()
                break;
            case "Change type":
                setIsLearning(!isLearning)
                break;
            default:
                break;
        }
    })

    return (

        <Grid gridTemplateRows={{
            base: positionQuestion,
            sm: positionQuestion,
            md: "auto 1fr 4fr",
            lg: "auto 1fr 4fr",
            xl: "auto 1fr 4fr",
            "2xl": "auto 1fr 4fr"
        }}
              h={"100%"}
              gap={2}
              maxW={"720px"}
              w={'100%'}
              justifySelf={'center'}
        >
            <Question/>
            {!isStart &&
                <VStack h={"auto"} >
                    <Button
                        {...buttonStyles}
                        onClick={() => handleClick("Game")}>
                        {translations[language].start}
                    </Button>
                    <Button
                        {...buttonStyles}
                        fontSize={{base: "small", sm: "small", md: "sm", lg: "md", xl: "md", "2xl": "md"}}
                        onClick={() => handleClick("Change type")}>
                        {isLearning ? translations[language].pressToGame : translations[language].pressToTraining}
                    </Button>
                </VStack>}

            {isStart && <Answers/>}
            {!isStart && isCongratulations && <Congratulation/>}
        </Grid>

    );
}