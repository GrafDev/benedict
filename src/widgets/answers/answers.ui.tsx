import React, {useEffect, useState} from "react";
import {Button, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import {nanoid} from "nanoid";
import {IDictionaryItem} from "../../shared/types.ts";
import {useDict} from "../../shared/zustand/store.ts";

export const Answers: React.FC = () => {
    const dict: IDictionaryItem[] = useDict(state => state.dict)
    const isStart: boolean = useDict(state => state.isStart)
    const [_dict, setDict] = useState<IDictionaryItem[]>([])
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const isRight = false



    useEffect(
        () => {
            setDict(dict)
        }
    ), [isStart]

    return (
        <VStack as="main"
                gap={"1vh"}
                justifyContent={{base: "end", sm: "end", md: "start", lg: "start", xl: "start", "2xl": "start"}}
                pb={6}
        >
            {_dict.slice(0, 10).map((word: IDictionaryItem, index:number) => (

                <Button key={nanoid(index)}

                        w={'80%'}
                        maxW={"720px"}
                        rounded={100}
                        background={isDark ? 'rgba(10, 10, 10, 0.8)' : 'rgba(250, 250, 250, 0.9)'}
                        border={isDark ? '1px solid #A0AEC0' : '1px solid #718096'}
                        _hover={{
                            border: isDark ? '1px solid #F7FAFC' : '1px solid #1A202C',
                            background: isDark ? 'rgba(20, 20, 20, 0.9)' : 'rgba(255, 255, 255, 1)',
                            transform: isDark ? 'scale(1.03)' : 'scale(1.02)',
                        }}
                        _active={{
                            background: isRight ? 'teal.700' : 'red.600',
                            transform: 'scale(0.97)',
                        }}
                        h={"5vh"}
                        boxShadow={"md"}
                >
                    <Text
                        fontSize={{base: "sm", sm: "md", md: "md", lg: "lg", xl: "2xl", "2xl": "3xl"}}
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