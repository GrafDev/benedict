import { TColorUI } from "../types/ui-types.ts";
import { css } from "@chakra-ui/react";

const shineKeyframes = css({
    '@keyframes shineEffect': {
        '0%': { left: '500%' },
        '100%': { left: '-500%' }
    }
});

export const buttonStyles = (colorUI: TColorUI,width=350,deg=120, time = 10, isDark = false) => {
    const shineStyles = css({
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-500%',
            width: `${width}%`,
            height: '100%',
            background: `linear-gradient(${deg}deg, transparent 0%, transparent 40%`+
                `,${isDark ? 'rgba(200, 200, 200,0.3)' : 'rgba(100, 100, 100, 0.2)'} 50%, transparent 70%, transparent 100%)`,
            animation: `shineEffect ${time}s linear infinite`
        }
    });

    return {
        w: 'fit-content',
        minW: '100px',
        rounded: '15px',
        colorScheme: colorUI,
        transition: 'all 0.3s ease-in-out',
        border: '1px solid',
        borderColor: colorUI === 'gray' ? 'gray' : 'transparent',
        boxShadow: `
      0 2px 4px rgba(0,0,0,0.1), 
      inset 0 1px 3px rgba(255,255,255,0.2), 
      inset 0 -2px 3px rgba(0,0,0,0.1)
    `,
        css: [shineKeyframes, shineStyles],
        _hover: {
            filter: 'brightness(110%)',
            boxShadow: `
        0 4px 6px rgba(0,0,0,0.15), 
        inset 0 1px 3px rgba(255,255,255,0.3), 
        inset 0 -2px 3px rgba(0,0,0,0.1)
      `,
        },
        _active: {
            transform: 'translateY(1px)',
            filter: 'brightness(90%)',
            boxShadow: `
        0 1px 2px rgba(0,0,0,0.1), 
        inset 0 1px 3px rgba(0,0,0,0.2)
      `,
        },
        _focus: {
            outline: 'none',
            boxShadow: `
        0 0 0 3px ${colorUI}.400, 
        0 2px 4px rgba(0,0,0,0.1), 
        inset 0 1px 3px rgba(255,255,255,0.2), 
        inset 0 -2px 3px rgba(0,0,0,0.1)
      `,
        }
    }
}