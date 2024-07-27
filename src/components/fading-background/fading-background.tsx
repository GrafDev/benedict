import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {BG_URLS} from "../../shared/constants";
import {BG_DARK, BG_LIGHT} from "../../shared/constants/ui/backgrounds.ts";
import useUI from "../../shared/hooks/use-ui.tsx";


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
    const {isDark, isBG} = useUI()
    const [currentBg, setCurrentBg] = useState('');
    const [nextBg, setNextBg] = useState('');
    const [isTransitioning, setIsTransitioning] = useState(false);

    const getBackground = (isBG: boolean, isDark: boolean) => {
        if (!isBG) {
            return isDark ? BG_DARK : BG_LIGHT;
        }
        const randomImage = BG_URLS[Math.floor(Math.random() * BG_URLS.length)];
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