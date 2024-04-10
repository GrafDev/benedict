import {Flex} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";




export const Timer: React.FC = () => {
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    const [milliseconds, setMilliseconds] = useState<number>(0);

    let x: NodeJS.Timeout | null = null;
    let deadline: number | null = null;


    const count = () => {
        const now = new Date().getTime();
        const t = now-deadline!;
        const newMinutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        const newSeconds = Math.floor((t % (1000 * 60)) / 1000);
        const newMilliseconds= Math.floor((t % (1000 )) / 100);


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
        deadline = new Date('apr 29, 2018 21:00:00').getTime();
        x = setInterval(count, 10);

        return () => {
            if (x) {
                clearInterval(x);
            }
        };
    }, []);

    return (
        <Flex justify={"center"}
              maxW={"720px"}
              mx={"auto"}
              wrap={"nowrap"}
        >
            <span className="minutes" id="minutes">
                    {minutes}
                </span>
            :
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

