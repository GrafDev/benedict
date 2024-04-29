import { useColorModeValue, VStack} from "@chakra-ui/react";
import {Text} from "@chakra-ui/react";
import {useEffect} from "react";
import {useUI} from "../../shared/store/zustand";
import {PAGE_NOT_FOUND_URL} from "../../shared/store/constants-store";

export const NotFoundPage = () => {
    const isBG = useUI(state => state.isBG);
    const setLinkBG = useUI(state => state.setLinkBG);
    const isDark = useColorModeValue('light', 'dark') === 'dark';
    useEffect(() => {
        isBG && setLinkBG(PAGE_NOT_FOUND_URL)
    }, [isBG]);
    const words = "404 PAGE NOT FOUND".split(' ');
    return (
        <VStack
            display={"flex"}
            justifySelf={"center"}
            justifyContent={"center"}
            w={"100%"}
            h={"100%"}
            p={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
            fontSize={{base: "lg", sm: "lg", md: "x-large", lg: "x-large", xl: "xx-large", "2xl": "xxx-large"}}
            background={isDark ? 'rgba(10, 10, 10, 0.4)' : 'rgba(250, 250, 250, 0.4)'}>
            {words.map((word, index) => (
                <Text
                    key={index}
                    fontSize={{base: "lg", sm: "lg", md: "x-large", lg: "x-large", xl: "xx-large", "2xl": "xxx-large"}}
                >
                    {word}
                </Text>
            ))}
        </VStack>
    )
}