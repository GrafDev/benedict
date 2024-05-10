import {Box, useColorModeValue, VStack} from "@chakra-ui/react";
import React, {useEffect} from "react";
import {timeFormat} from "../../features/common/timeFormat.ts";
import {useCommon, useTimer, useUser} from "../../shared/store/zustand";


export const Congratulation: React.FC = () => {
    const elapsedTime: number = useTimer(state => state.elapsedTime)
    const mistakes: number = useCommon(state => state.mistakes)
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';

    const setUserRecord = useUser(state => state.setUserRecord)

    useEffect(() => {
        setUserRecord(elapsedTime)
    }, []);
    return (

        <VStack
            display={"flex"}
            justifySelf={"center"}
            justifyContent={"center"}
            w={"95%"}
            h={"95%"}
            maxW={"720px"}
            m={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
            p={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
            rounded={"xl"}
            background={isDark ? 'rgba(10, 10, 10, 0.7)' : 'rgba(250, 250, 250, 0.7)'}
            // border={isDark ? '1px solid #A0AEC0' : '1px solid #718096'}
            fontSize={{base: "lg", sm: "lg", md: "x-large", lg: "x-large", xl: "xx-large", "2xl": "xxx-large"}}>
            <Box fontWeight={"bold"}>
                {mistakes === 0 && "Congratulations!"}
                {mistakes > 0 && mistakes < 6 && "Not bad"}
                {mistakes > 5 && mistakes < 10 && "Finally"}
                {mistakes > 9 && "Uff..."}</Box>
            <Box>Your time: {timeFormat(elapsedTime)}</Box>
            <Box>
                {mistakes === 0 && "Great job!"}
                {mistakes > 0 && mistakes < 6 && "Try again"}
                {mistakes > 5 && mistakes < 10 && "You can do better"}
                {mistakes > 9 && "Are you even trying?"}
            </Box>
            {mistakes === 1 && <Box>But your made mistake: {mistakes}</Box>}
            {mistakes > 1 && <Box color={isDark ? 'red.400' : 'red.700'}>But your made mistakes: {mistakes}</Box>}
        </VStack>
    )
}