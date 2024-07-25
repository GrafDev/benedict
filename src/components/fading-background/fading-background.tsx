import React, { useEffect, useState } from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';
import {useUI} from "../../shared/store/zustand";
import {BG_URL} from "../../shared/store/constants-store";
import {backgroundDark, backgroundLight} from "../../shared/ui/constants/backgrounds.ts";


const BackgroundLayer = styled.div<{ bg: string; isActive: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ bg }) => bg};
    background-size: cover;
    background-position: center;
    transition: opacity 0.5s ease-in-out;
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
`;

const FadingBackground: React.FC = () => {
    const isBG = useUI(state => state.isBG);
    const isDark = useColorModeValue('light', 'dark') === 'dark';
    const [currentBg, setCurrentBg] = useState('');
    const [nextBg, setNextBg] = useState('');
    const [isTransitioning, setIsTransitioning] = useState(false);

    const getBackground = (isBG: boolean, isDark: boolean) => {
        if (!isBG) {
            return isDark ? backgroundDark : backgroundLight;
        }
        const randomImage = BG_URL[Math.floor(Math.random() * BG_URL.length)];
        const gradient = isDark
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.6))'
            : 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.0))';
        return `${gradient}, url(${randomImage})`;
    };

    useEffect(() => {
        const newBg = getBackground(isBG, isDark);
        if (newBg !== currentBg) {
            setNextBg(newBg);
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentBg(newBg);
                setIsTransitioning(false);
            }, 500);
        }
    }, [isBG, isDark]);

    return (
        <>
            <BackgroundLayer bg={currentBg} isActive={!isTransitioning} />
            <BackgroundLayer bg={nextBg} isActive={isTransitioning} />
        </>
    );
};

export default FadingBackground;