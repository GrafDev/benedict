import React, {useEffect} from "react";
import {Grid} from "@chakra-ui/react";
import {Answers} from "../../widgets/answers";
import {Question} from "../../widgets/question";
import {useCommon, useUser} from "../../shared/store/zustand";
import {Congratulation} from "../../widgets/congratulation";


export const GamePage: React.FC = () => {

    const isStart: boolean = useCommon(state => state.isStart)
    const setLearningWords = useUser(state => state.setLearningWords)
    const setQuestionWord = useUser(state => state.setQuestionWord)
    const isCongratulations: boolean = useCommon(state => state.isCongratulations)

    const positionQuestion: string = !isStart ? "auto 1fr" : "1fr auto"

    useEffect(() => {
        console.log("Effect of game-page ui start")
        setLearningWords()
        setQuestionWord()
        console.log("Effect of game-page ui end")
    }, []);

    return (

        <Grid gridTemplateRows={{
            base: positionQuestion,
            sm: positionQuestion,
            md: "auto 1fr",
            lg: "auto 1fr",
            xl: "auto 1fr",
            "2xl": "auto 1fr"
        }}
              h={"100%"}
              gap={2}
              maxW={"720px"}
              w={'100%'}
              justifySelf={'center'}
        >
            <Question/>
            {isStart && <Answers/>}
            {!isStart && isCongratulations && <Congratulation/>}
        </Grid>

    );
}