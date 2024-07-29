import {Text,Box, VStack} from "@chakra-ui/react";
import React, {useEffect} from "react";
import {timeFormat} from "../../../features/common/timeFormat.ts";
import {useCommonStore, useTimerStore} from "../../../shared/store/zustand";
import useOptions from "../../../shared/hooks/use-options.tsx";


export const Congratulation: React.FC = () => {
    const elapsedTime: number = useTimerStore(state => state.elapsedTime)
    const mistakes: number = useCommonStore(state => state.mistakes)
    const isLearning: boolean = useCommonStore(state => state.isLearning)
    // const [isRecord, setIsRecord] = useState<boolean>(false)
    const {isDark,gTrans} = useOptions()


    useEffect(() => {
        if (mistakes === 0 && !isLearning) {
            console.log("New record: ", elapsedTime)
            // setUserRecord(elapsedTime)
        }
    }, []);
    // useEffect(() => {
    //     if (mistakes === 0 && !isLearning) {
    //         setIsRecord(true)
    //     }
    // }, [userRecord]);

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
                {mistakes === 0 && gTrans("Congratulations!")}
                {mistakes > 0 && mistakes < 6 && gTrans("No Bad")}
                {mistakes > 5 && mistakes < 10 && gTrans("Finally")}
                {mistakes > 9 && gTrans("Uff...")}</Box>
            <Box>{gTrans("Your Time:")} {timeFormat(elapsedTime)}</Box>
            <Box>
                {mistakes === 0 && gTrans("Great Job!")}
                {mistakes > 0 && mistakes < 6 && gTrans("Try Again")}
                {mistakes > 5 && mistakes < 10 && gTrans("You Can Do Better")}
                {mistakes > 9 && gTrans("Are You Even Trying?")}
            </Box>
            {mistakes === 1 && <Box>{gTrans("But you made one mistake")}</Box>}
            {mistakes > 1 && <Box color={isDark ? 'red.400' : 'red.700'}>{gTrans("Because you made any mistakes")} {" "} {mistakes}</Box>}
            <Box>
                {/*{mistakes < 1 && isRecord ? translations[language].youSetPersonalRecord:mistakes<1? translations[language].yourRecord:""}*/}
            </Box>
            {mistakes<1 && <Text fontWeight={"bold"}>
                {/*{timeFormat(userRecord)}*/}
            </Text>}
        </VStack>
    )
}