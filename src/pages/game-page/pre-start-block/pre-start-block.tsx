import {Button, HStack, Link, Text, useDisclosure, VStack} from "@chakra-ui/react";
import HowToPlay from "./how-to-play/how-to-play.tsx";
import React from "react";
import {useCommonStore, useUserStore} from "../../../shared/store/zustand";
import {isPrintableKey} from "../../../features/common";
import useOptions from "../../../shared/hooks/use-options.tsx";

interface PreStartBlockProps {
    handleClick: (command: string) => void;
}

const PreStartBlock: React.FC<PreStartBlockProps> = ({ handleClick }) => {
const {colorElement,isDark,gTrans,buttonStyle} = useOptions()
    const isCongratulations: boolean = useCommonStore(state => state.isCongratulations)
    const isLearning: boolean = useCommonStore(state => state.isLearning)
    const currentVocabulary = useUserStore(state => state.currentVocabulary)
    const { onClose} = useDisclosure()


    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (isPrintableKey(event.key)) {
            onClose();
        }

        if (event.key === "ESC") {
            onClose();
        }
    };



    const _buttonStyles = {
        ...buttonStyle,
        w: '90%',
        m: 1,
        pl: 10,
        pr: 10,
        maxWidth: '400px',
    };


    return(
        <VStack h={"auto"} mt={[4, 8, 12, 16]}
                justifySelf={"center"}
                gap={4}
                onKeyUp={(e) => handleKeyDown(e)}
                alignItems={"center"}
                backgroundColor={`${isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'}`}
                backdropFilter="blur(10px)"
                boxShadow={isDark ? "0 8px 8px 0 rgba(0, 0, 0, 0.37)" : "0 8px 8px 0 rgba(91, 114, 120, 0.37)"}
                border="2px solid rgba(255, 255, 255, 0.18)"
                rounded={[2, 4, 10, 15]}
                p={5}
        >
            <VStack>
                <Text>
                    {`${gTrans("You have chosen to study the dictionary")}:`}
                </Text>
                <Text color={colorElement}>
                    {currentVocabulary.name}
                </Text>
            </VStack>
            <Button
                {..._buttonStyles}
                minH={"40px"}
                maxW={"200px"}
                onClick={() => handleClick("Game")}>
                {isLearning ? gTrans("Training") : gTrans("Learn")}
            </Button>
            <HStack justifyContent={"center"}
                    alignItems={"center"}

            >

                <Text as={Link} variant={"link"} alignSelf={"end"}
                      decoration={"underline"}
                      onClick={() => handleClick("Change type")}>
                    {isLearning ? gTrans("Press to Switch to Game") : gTrans("Press to Switch to Training")}
                </Text>
            </HStack>

            {!isCongratulations && <HowToPlay/>}
        </VStack>
    )
}

export default PreStartBlock;
