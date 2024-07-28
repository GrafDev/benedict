import React, {ReactElement} from 'react';
import {useTrail, animated} from '@react-spring/web';
import {Box} from "@chakra-ui/react";
import useOptions from "../../shared/hooks/use-options.tsx";


interface TrailProps {
    open: boolean;
    children: ReactElement[];
}

export const TrailAnimation: React.FC<TrailProps> = ({open, children}) => {
    const {isDark} = useOptions()
    const items = React.Children.toArray(children);
    const trail = useTrail(items.length, {
        config: {mass: 5, tension: 2000, friction: 200},
        opacity: open ? 1 : 0,
        x: open ? 0 : 20,
        height: open ? 110 : 0,
        from: {opacity: 0, x: 20, height: 0},
    });

    return (
        <Box justifySelf={"center"}
             h={"100%"}
             w={"100%"}
             color={isDark ? "white" : "black"}
             textShadow={isDark ? "2px 2px 2px black" : "2px 2px 2px white"}
             fontSize={{base: "4em", sm: "4em", md: "5em", lg: "6em", xl: "6em", "2xl": "6em"}}
             fontWeight={{base: "bold", sm: "bold", md: "bolder", lg: "bolder", xl: "bolder", "2xl": "bolder"}}>
            {trail.map(({height, ...style}, index) => (
                <animated.div
                    key={index}
                    style={{
                        ...style,
                        width: "100%",
                        height: "80px",
                        lineHeight: "80px",
                        letterSpacing: "-0.02em",
                        willChange: "transform, opacity",
                        overflow: "hidden",
                    }}>
                    <animated.div style={{height}}>{items[index]}</animated.div>
                </animated.div>
            ))}
        </Box>
    );
};