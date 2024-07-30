import React, {useEffect, useState} from "react";
import {
    Button,
    Flex,
    Grid,
    Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {Question} from "./question";
import {useCommonStore, useTimerStore, useUserStore} from "../../shared/store/zustand";
import {Fade} from "react-awesome-reveal";
import {Answers} from "./answers";
import PreStartBlock from "./pre-start-block/pre-start-block.tsx";
import {Congratulation} from "./congratulation";
import useOptions from "../../shared/hooks/use-options.tsx";


const GamePage: React.FC = () => {

    const isStart: boolean = useCommonStore(state => state.isStart)
    const setLearningWords = useUserStore(state => state.setLearningWords)
    const setQuestionWord = useUserStore(state => state.setQuestionWord)
    // const isCongratulations: boolean = useCommon(state => state.isCongratulations)
    const positionQuestion: string = !isStart ? "auto 1fr" : "1fr auto"
    const {isDark,gTrans,buttonStyle} = useOptions()
    const setIsLearning = useCommonStore(state => state.setIsLearning)
    const changeQuestionWord = useUserStore(state => state.changeQuestionWord)
    const clearMistakes = useCommonStore(state => state.clearMistakes)
    const setStartTime = useTimerStore(state => state.setStartTime)
    const setIsStart = useCommonStore(state => state.setIsStart)
    const setIsCongratulations = useCommonStore(state => state.setIsCongratulations)
    const isCongratulations: boolean = useCommonStore(state => state.isCongratulations)
    const isLearning: boolean = useCommonStore(state => state.isLearning)
    const [preStart, setPreStart] = useState<boolean>(false)
    const [treeSeconds, setTreeSeconds] = useState<number>(5)
    const [onCancel, setOnCancel] = useState<boolean>(false)
    const setMistake = useCommonStore(state => state.setMistake)
    const {isOpen} = useDisclosure()



    const _buttonStyles = {...buttonStyle,
        w: '90%',
        m: 1,
        pl: 10,
        pr: 10,
        maxWidth: '400px',
    };

    useEffect(() => {
        clearMistakes()
        setLearningWords()
        setQuestionWord()

    }, []);

    const handlerStart = () => {
        if (!isStart && !onCancel) {
            setPreStart(false)
            setOnCancel(false)
            changeQuestionWord()
            setIsStart(true)
            setStartTime()
            clearMistakes()
            setIsCongratulations(false)
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
                setLearningWords()
                setIsCongratulations(false);
                setQuestionWord();
                setMistake(false);
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
                            {gTrans("Cancel")}
                        </Button>
                      </VStack>
                    }
                </Grid>
            </Flex>
        </Fade>


    )
}

export default GamePage;