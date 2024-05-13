import {Flex} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useTimer} from "../store/zustand";
import {getMilliseconds, getMinutes, getSeconds} from "../../features/common/timeFormat.ts";


export const Timer: React.FC = () => {
    let startTime: number = useTimer(state => state.startTime)
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    const [milliseconds, setMilliseconds] = useState<number>(0);

    let x: NodeJS.Timeout | null = null;

    const count = () => {
        const now = new Date().getTime();
        const t = now - startTime!;
        const newMinutes = getMinutes(t)
        const newSeconds = getSeconds(t)
        const newMilliseconds = getMilliseconds(t)


        setMinutes(newMinutes);
        setSeconds(newSeconds);
        setMilliseconds(newMilliseconds);

        if (t < 0) {
            clearInterval(x!);
            setMinutes(0);
            setSeconds(0);
        }
    };

    useEffect(() => {
        x = setInterval(count, 10);

        return () => {
            if (x) {
                clearInterval(x);
            }
        };
    }, []);

    return (
        <Flex
              maxW={"720px"}
              mx={"auto"}
              wrap={"nowrap"}
              fontSize={{base: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl", "2xl": "2xl"}}
              ml={1}
              justifySelf={"left"}
        >
            {minutes > 0 && <span className="minutes" id="minutes">
                    {minutes}
                </span>}
            {minutes > 0 && ":"}
            <span className="seconds" id="second">
                    {seconds}
                </span>
            :
            <span className="mili-seconds" id="mili-seconds">
                    {milliseconds}
                </span>
        </Flex>
    );
};

