import React from "react";
import {Box, Flex, useColorModeValue} from "@chakra-ui/react";
import {ColorSwitcher} from "../../shared/ui/Switcher.tsx";
import {ItemMenu} from "../../shared/ui/ItemMenu.tsx";
import {Timer} from "../../shared/ui/Timer.tsx";
import {useDict} from "../../shared/store/zustand/store.ts";
import {FaStop} from "react-icons/fa";


export const Header: React.FC = () => {
    const isStart = useDict(state => state.isStart)
    const setIsStart = useDict(state => state.setIsStart)
    const setStartTime = useDict(state => state.setStartTime)
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';


    const handlerStart = () => {
        setIsStart(true)
        setStartTime(new Date().getTime())
    }
    const handlerStop = () => {
        setIsStart(false)
        setStartTime(new Date().getTime())

    }

    return (
        <Box as={"header"} display="flex" justifyContent="center" alignItems="center"
             background={'gray800'}
             boxShadow={"md"}
        >
            <Flex
                justify={"space-between"}
                align={"center"}
                h={"100%"}
                w={"100%"}
                p={1}
                wrap={"nowrap"}
                maxW={"720px"}
            >
                <ItemMenu/>
                {isStart &&
                    <Box as={"button"}
                         display={"flex"}
                         gap={"1vh"}
                         alignItems={"center"}
                         justifyItems={"space-between"}
                         fontSize={{base: "sm", sm: "md", md: "md", lg: "lg", xl: "2xl", "2xl": "3xl"}}
                         background={isDark ? 'gray.700' : 'gray.200'}
                         pr={3}
                         pl={3}
                         rounded={5}
                         onClick={handlerStop}>

                        <FaStop/>
                        <Timer/>
                    </Box>}
                {!isStart &&
                    <Box as={"button"}
                         fontSize={{base: "sm", sm: "md", md: "md", lg: "lg", xl: "2xl", "2xl": "3xl"}}
                         background={isDark ? 'gray.700' : 'gray.200'}
                         pr={3}
                         pl={3}
                         rounded={5}
                         onClick={handlerStart}>

                        Start
                    </Box>}
                <ColorSwitcher/>
            </Flex>
        </Box>

    );
}

