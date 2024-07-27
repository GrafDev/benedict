import {  VStack} from "@chakra-ui/react";
import {Text} from "@chakra-ui/react";
import {useEffect} from "react";
import {PAGE_NOT_FOUND_BG_URL} from "../../shared/constants";
import useUI from "../../shared/hooks/use-ui.tsx";
import {getBG} from "../../features/common";

const NotFoundPage = () => {
    const {isBG, isDark} = useUI()
    useEffect(() => {
        isBG && getBG(PAGE_NOT_FOUND_BG_URL)
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
            fontSize={{base: "lg", sm: "lg", md: "large", lg: "large", xl: "x-large", "2xl": "xx-large"}}
            background={isDark ? 'rgba(10, 10, 10, 0.4)' : 'rgba(250, 250, 250, 0.4)'}>
            {words.map((word, index) => (
                <Text
                    key={index}
                    fontSize={{base: "lg", sm: "lg", md: "large", lg: "large", xl: "x-large", "2xl": "xx-large"}}
                >
                    {word}
                </Text>
            ))}
        </VStack>
    )
}

export default NotFoundPage;