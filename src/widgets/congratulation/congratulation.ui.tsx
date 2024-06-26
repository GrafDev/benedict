import {Text,Box, useColorModeValue, VStack} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {timeFormat} from "../../features/common/timeFormat.ts";
import {useCommon, useTimer, useUser} from "../../shared/store/zustand";


export const Congratulation: React.FC = () => {
    const elapsedTime: number = useTimer(state => state.elapsedTime)
    const mistakes: number = useCommon(state => state.mistakes)
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const userRecord: number = useUser(state => state.currentUser.userRecord)
    const translations = useUser(state => state.translations)
    const language = useUser(state => state.currentUser.language)
    const [isRecord, setIsRecord] = useState<boolean>(false)

    const setUserRecord = useUser(state => state.setUserRecord)

    useEffect(() => {
        setUserRecord(elapsedTime)
    }, []);
    useEffect(() => {
        setIsRecord(true)
    }, [userRecord]);

    return (

        <VStack
            display={"flex"}
            justifySelf={"center"}
            justifyContent={"center"}
            w={"95%"}
            h={"fit-content"}
            alignSelf={"center"}
            maxW={"720px"}
            m={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
            p={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
            rounded={"xl"}
            background={isDark ? 'rgba(10, 10, 10, 0.7)' : 'rgba(250, 250, 250, 0.7)'}
            fontSize={{base: "lg", sm: "lg", md: "large", lg: "large", xl: "x-large", "2xl": "xx-large"}}>
            <Box fontWeight={"bold"}>
                {mistakes === 0 && translations[language].congratulations}
                {mistakes > 0 && mistakes < 6 && translations[language].noBad}
                {mistakes > 5 && mistakes < 10 && translations[language].finally}
                {mistakes > 9 && translations[language].uff}</Box>
            <Box>{translations[language].yourTime} {timeFormat(elapsedTime)}</Box>
            <Box>
                {mistakes === 0 && translations[language].greatJob}
                {mistakes > 0 && mistakes < 6 && translations[language].tryAgain}
                {mistakes > 5 && mistakes < 10 && translations[language].youCanDoBetter}
                {mistakes > 9 && translations[language].areYouEvenTrying}
            </Box>
            {mistakes === 1 && <Box>{translations[language].youMadeMistake}{" "}{mistakes}</Box>}
            {mistakes > 1 && <Box color={isDark ? 'red.400' : 'red.700'}>{translations[language].youMadeMistakes} {" "} {mistakes}</Box>}
            <Box>
                { isRecord ? translations[language].youSetPersonalRecord: translations[language].yourRecord  }
            </Box>
            <Text fontWeight={"bold"}>
                {timeFormat(userRecord)}
            </Text>
        </VStack>
    )
}