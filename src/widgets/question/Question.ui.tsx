import {Box, Text, useColorModeValue} from '@chakra-ui/react';
import {useDict} from "../../shared/store/zustand/store.ts";
import {IDictionaryItem} from "../../shared/types.ts";

export const Question = () => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const isStart: boolean = useDict(state => state.isStart)
    const questionWord: IDictionaryItem = useDict(state => state.questionWord)
    return (
        <Box justifySelf={'center'}
             w={"90%"}
             h={"auto"}
             maxW={"720px"}
             maxH={"100%"}
             m={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
             p={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
             alignContent={'center'}
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
                fontSize={{base: "md", sm: "md", md: "xl", lg: "3xl", xl: "4xl", "2xl": "5xl"}}
                color={isDark ? 'gray.200' : 'black'}
                pr={3} pl={3}
                maxW={"100%"}
                fontWeight={"bold"}
                align={'center'}>
                {questionWord.word}

            </Text>
        </Box>
    );
}