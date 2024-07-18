import React, { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';

const gradientAnimation = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

const AnimatedBackground = styled.div`
    width: 100%;
    height: 100vh;
    background: linear-gradient(
            -45deg,
            #e0e0e0,
            #bdbdbd,
            #9e9e9e,
            #757575
    );
    background-size: 400% 400%;
    animation: ${gradientAnimation} 15s ease infinite;
`;

interface AnimatedBackgroundComponentProps {
    children?: ReactNode;
}

const AnimatedBackgroundComponent: React.FC<AnimatedBackgroundComponentProps> = ({ children }) => {
    return (
        <AnimatedBackground>
            {children}
        </AnimatedBackground>
    );
};

export default AnimatedBackgroundComponent;