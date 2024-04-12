import React from "react";
import {Box, Button, Flex} from "@chakra-ui/react";
import {ColorSwitcher} from "../../shared/ui/Switcher.tsx";
import {ItemMenu} from "../../shared/ui/ItemMenu.tsx";
import {Timer} from "../../shared/ui/Timer.tsx";
import {useDict} from "../../shared/zustand/store.ts";
import {defaultWord} from "../../shared/store/constants/defaulDictionary.ts";


export const Header: React.FC = () => {
    const isStart = useDict(state => state.isStart)
    const setIsStart = useDict(state => state.setIsStart)
    const setStartTime = useDict(state => state.setStartTime)
    const setDict = useDict(state => state.setDict)
    const clearDict = useDict(state => state.clearDict)


    const handlerStart = () => {
        setDict(defaultWord)
        setIsStart(true)
        setStartTime(new Date().getTime())
    }
    const handlerStop = () => {
        clearDict()
        setIsStart(false)
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
                    <Button w={"80%"}
                            justifyContent={"center"}
                            fontSize={{base: "sm", sm: "md", md: "md", lg: "lg", xl: "2xl", "2xl": "3xl"}}
                            p={2}
                            onClick={handlerStop}>
                        Stop
                        <Timer/>
                    </Button>}
                {!isStart &&
                    <Button size={"sm"}
                            onClick={handlerStart}>
                        Start
                    </Button>}
                <ColorSwitcher/>
            </Flex>
        </Box>

    );
}

