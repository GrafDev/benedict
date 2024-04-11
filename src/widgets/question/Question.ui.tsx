import {Box, Text, useColorModeValue} from '@chakra-ui/react';

export const Question = () => {
    const isDark: boolean = useColorModeValue('light', 'dark')==='dark';
    const question = "What is benedict? Benedict is nothing because it is a  programme";
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
            <Text
                fontSize={{base: "sm", sm: "md", md: "xl", lg: "3xl", xl: "4xl", "2xl": "5xl"}}
                color={isDark  ? 'gray.200' : 'black'}
                pr={3} pl={3}
                maxW={"100%"}
                align={'center'}
                border={isDark  ? 'black' : 'white'}
            >
                {question}
            </Text>
        </Box>
    );
}