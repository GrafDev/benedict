import React from "react";
import {Button, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import {IDictionaryItem} from "../../shared/store/constants/defaulDictionary.ts";
import {useDict} from "../../shared/store/zustand/storeUseDict.ts";
import {nanoid} from "nanoid";

export const Answers: React.FC = () => {
    const listWords: IDictionaryItem[] = useDict(state => state.dict)
    const text: string = useColorModeValue('light', 'dark');


    return (
        <VStack as="main"
                h={"100%"}
                gap={"1vh"}

        >
            {listWords.slice(0, 10).map((word: IDictionaryItem, index) => (

                <Button key={nanoid(index)}
                        w={"90%"}
                        maxW={"720px"}
                        background={text === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.8)'}
                        color={text === 'dark' ? 'white' : 'black'}
                        _hover={{
                            border: text === 'dark' ? '1px solid white' : '1px solid black',
                            background: text === 'dark' ? 'rgba(50, 50, 50, 0.5)' : 'rgba(255, 255, 255, 0.9)',
                            transform: 'scale(1.03)',
                        }}
                        h={"5vh"}
                >
                    <Text
                        fontSize={{base: "base", sm: "sm", md: "md", lg: "lg", xl: "2xl", "2xl": "3xl"}}
                        pr={3} pl={3}
                        maxW={"100%"}
                        align={'center'}
                    >
                        {word.word}
                    </Text>
                </Button>
            ))
            }
        </VStack>
    )
}