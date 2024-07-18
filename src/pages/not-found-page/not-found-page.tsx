import { useColorModeValue, VStack} from "@chakra-ui/react";
import {Text} from "@chakra-ui/react";
import {useEffect} from "react";
import {useUI} from "../../shared/store/zustand";
import {PAGE_NOT_FOUND_URL} from "../../shared/store/constants-store";
import {useUser} from "../../shared/store/zustand";

const NotFoundPage = () => {
    const isBG = useUser(state => state.currentUser.isBG);
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