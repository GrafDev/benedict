import React, {useEffect} from "react";
import {Box, Grid, useColorModeValue} from "@chakra-ui/react";
import {Answers} from "../../widgets/answers";
import {Question} from "../../widgets/question";
import {useCommon, useDict} from "../../shared/store/zustand/store.ts";
import {makeBG} from "../../features/common";


export const Game: React.FC = () => {

    const isStart: boolean = useCommon(state => state.isStart)
    const setLearnedWords = useDict(state => state.setLearningWords)

    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const BG: string = makeBG(isDark);
    const positionQuestion: string = !isStart ? "auto 1fr" : "1fr auto"

    useEffect(() => {
        setLearnedWords()
    }, []);
    return (
        <Box
            background={BG}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
            w={"100%"}
            display={'flex'}
            justifyContent={'center'}
            pt={2}
            rounded={"md"}>
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
            </Grid>
        </Box>

    );
}