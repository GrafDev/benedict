import {TColorUI} from "../types/ui-types.ts";


export const buttonStyles = (colorUI: TColorUI) => {
    return {
        w: {base: "80%", sm: "60%", md: "40%", lg: "fit-content", xl: "fit-content"},
        minW: '200px',
        rounded: '15px',
        colorScheme: colorUI,
        transition: 'all 0.2s ease-in-out',
        border:  '1px solid',

        borderColor:colorUI === 'gray' ? 'gray' : 'transparent',
        boxShadow: `
        0 2px 4px rgba(0,0,0,0.1), 
        inset 0 1px 3px rgba(255,255,255,0.2), 
        inset 0 -2px 3px rgba(0,0,0,0.1)
    `,
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