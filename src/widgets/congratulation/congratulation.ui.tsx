import {Box, useColorModeValue, VStack} from "@chakra-ui/react";
import React from "react";
import {useCommon, useTimer} from "../../shared/store/zustand/store.ts";
import {timeFormat} from "../../shared/ui/timeFormat.ts";


export const Congratulation: React.FC = () => {
    const elapsedTime = useTimer(state => state.elapsedTime)
    const mistakes = useCommon(state => state.mistakes)
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    return (

        <VStack
            display={"flex"}
            justifySelf={"center"}
            justifyContent={"center"}
            w={"90%"}
            h={"fit-content"}
            maxW={"720px"}
            m={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
            p={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
            rounded={"xl"}
            background={isDark ? 'rgba(10, 10, 10, 0.4)' : 'rgba(250, 250, 250, 0.4)'}
            border={isDark ? '1px solid #A0AEC0' : '1px solid #718096'}
            fontSize={{base: "lg", sm: "lg", md: "x-large", lg: "x-large", xl: "xx-large", "2xl": "xxx-large"}}>
            <Box>Congratulations!</Box>
            <Box>Your time: {timeFormat(elapsedTime)}</Box>
            <Box>Good job!</Box>
            {mistakes ===1  && <Box>But your made mistake: {mistakes}</Box>}
            {mistakes > 1 && <Box>But your made mistakes: {mistakes}</Box>}
        </VStack>
    )
}