import {Button, HStack, Switch, Text, useColorModeValue, useDisclosure, VStack} from "@chakra-ui/react";
import HowToPlay from "./how-to-play/how-to-play.tsx";
import React, {useEffect} from "react";
import { useUser} from "../../../shared/store/zustand";
import {isPrintableKey} from "../../../features/common";
import {buttonStyles} from "../../../shared/ui/button-style.ts";

interface PreStartBlockProps {
    handleClick: (command: string) => void;
}

const PreStartBlock: React.FC<PreStartBlockProps> = ({ handleClick }) => {

    const setLearningWords = useUser(state => state.setLearningWords)
    const setQuestionWord = useUser(state => state.setQuestionWord)
    // const isCongratulations: boolean = useCommon(state => state.isCongratulations)
    const setIsMistake = useUser(state => state.setIsMistake)
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const colorUI = useUser(store => store.currentUser.colorUI)
    const isLearning: boolean = useUser(state => state.isLearning)
    const translations = useUser(state => state.translations)
    const language = useUser(state => state.currentUser.language)
    const { onClose} = useDisclosure()


    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (isPrintableKey(event.key)) {
            onClose();
        }

        if (event.key === "ESC") {
            onClose();
        }
    };


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


    return(
        <VStack h={"auto"} mt={20}
                justifySelf={"center"}
                gap={4}
                onKeyUp={(e) => handleKeyDown(e)}
                alignItems={"center"}
                background={isDark ? "rgba(0, 0, 0, 0.30)" : "rgba(250, 250, 250, 0.3)"}
                p={5}
                rounded={10}
        >
            <Button
                {..._buttonStyles}
                minH={"40px"}
                maxW={"200px"}
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
            <HowToPlay/>
        </VStack>
    )
}

export default PreStartBlock;
