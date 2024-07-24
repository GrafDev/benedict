import React, {memo,useState, useEffect} from 'react';
import {Box} from '@chakra-ui/react';
import useMakeBG from "../../shared/hooks/make-bg.tsx";
import {useUI} from "../../shared/store/zustand";

interface FadingBackgroundProps {
    children: React.ReactNode;
}

const FadingBackground: React.FC<FadingBackgroundProps> =memo( ({children}) => {
    const background = useMakeBG()
    const [currentBg, setCurrentBg] = useState<string>(background);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const isBG = useUI(state => state.isBG)

    useEffect(() => {
        if (background !== currentBg) {
            console.log("3")
            setIsTransitioning(true);
            const timer = setTimeout(() => {
                setCurrentBg(background);
                setIsTransitioning(false);
            }, 1000); // Это время должно совпадать с длительностью перехода в CSS

            return () => clearTimeout(timer);
        }
    }, [isBG]);

    return (
        <Box position="relative" overflow="hidden">
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                background={currentBg}
                backgroundSize="cover"
                backgroundPosition="center"
                opacity={isTransitioning ? 0 : 1}
                transition="opacity 1s ease-in-out"
                zIndex={1}
            />
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                background={background}
                backgroundSize="cover"
                backgroundPosition="center"
                opacity={isTransitioning ? 1 : 0}
                transition="opacity 1s ease-in-out"
                zIndex={2}
            />
            <Box position="relative" zIndex={3}
                 w={"100%"}
                 display={'flex'}
                 justifyContent={'center'}
                 rounded={"md"}>
                {children}
            </Box>
        </Box>
    );
});

export default FadingBackground;
