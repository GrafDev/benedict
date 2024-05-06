import {Box, Text, useColorModeValue} from '@chakra-ui/react';
import {useCommon, useUser} from "../../shared/store/zustand";
import {getOneTranslateWord} from "../../features/toGame";

export const Question = () => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const isStart: boolean = useCommon(state => state.isStart)
    const questionWord = useUser(state => state.questionWord)
    const isTranslate = useUser(state => state.isTranslate)
    const learningWords = useUser(state => state.learningWords)

    return (
        <Box justifySelf={'center'}
             w={"95%"}
             h={"auto"}
             maxW={"720px"}
             maxH={"100%"}
             m={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
             p={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
             alignContent={'center'}
             rounded={"xl"}
             background={isDark ? 'rgba(10, 10, 10, 0.7)' : 'rgba(250, 250, 250, 0.7)'}
             // border={isDark ? '1px solid #A0AEC0' : '1px solid #718096'}
        >
            {!isStart &&
                <Text fontSize={{base: "2sm", sm: "2sm", md: "md", lg: "lg", xl: "xl", "2xl": "2xl"}}
                      color={isDark ? 'gray.200' : 'black'}
                      pr={3} pl={3}
                      maxW={"100%"}
                      align={'center'}>
                    Before START remember this word:
                </Text>}
            <Text
                fontSize={{base: "xl", sm: "2xl", md: "xl", lg: "3xl", xl: "4xl", "2xl": "5xl"}}
                color={isDark ? 'gray.200' : 'black'}
                pr={3} pl={3}
                maxW={"100%"}
                fontWeight={"bold"}
                align={'center'}>
                {(learningWords.length > 0) ? isTranslate ? getOneTranslateWord(questionWord) : questionWord.word : "At last just recollect last word"}

            </Text>
        </Box>
    );
}