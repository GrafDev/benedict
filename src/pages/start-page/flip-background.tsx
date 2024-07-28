import React, {FC, useState} from 'react';
import { useSpring, a } from '@react-spring/web';
import { Flex} from "@chakra-ui/react";
import { useOptionsStore } from "../../shared/store/zustand";
import useUI from "../../shared/hooks/use-ui.tsx";

interface FlipBackgroundProps {
    children?: React.ReactNode; // Optional child elements
}

export const FlipBackground: FC<FlipBackgroundProps> = ({ children }) => {
    const {isDark}=useUI()
    const [flipped, set] = useState(false);
    const BG = useOptionsStore((state: any) => state.linkBG); // Type any due to external store

    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    return (
        <Flex
            onClick={() => set((state) => !state)}
        >
            <a.div
                style={{
                    position: 'absolute',
                    maxWidth: 500,
                    maxHeight: 500,
                    width: 350,
                    height: 200,
                    cursor: 'pointer',
                    willChange: 'transform, opacity',
                    backgroundSize: 'cover',
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundPosition:"center",
                    opacity: opacity.to((o) => 1 - o),
                    transform: transform,
                    backgroundImage: isDark
                        ? `linear-gradient(rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0.4)), url(${BG})`
                        : `linear-gradient(rgba(240, 240, 240, 0.90), rgba(0, 0, 0, 0)), url(${BG})`,
                }}
            />
            <a.div
                style={{
                    position: 'absolute',
                    maxWidth: 500,
                    maxHeight: 500,
                    width: 350,
                    height: 200,
                    opacity: opacity,
                    transform: transform,
                    rotateX: '180deg',
                    cursor: 'pointer',
                    willChange: 'transform, opacity',
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundPosition:"center",
                    backgroundSize: 'cover',
                    backgroundImage: isDark
                        ? `linear-gradient(rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0.4)), url(${BG})`
                        : `linear-gradient(rgba(240, 240, 240, 0.90), rgba(0, 0, 0, 0)), url(${BG})`,
                }}
            />
            {children}
        </Flex>
    );
};
