import {IconButton, useColorMode, useColorModeValue} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";

/**
 * Component for switching between light and dark mode
 */
export const ColorSwitcher = () => {
    // Access the toggleColorMode function from useColorMode hook
    const {toggleColorMode} = useColorMode();

    // Determine the text based on the current color mode
    const text:string = useColorModeValue('dark', 'light');

    // Determine the SwitchIcon based on the current color mode
    const SwitchIcon= useColorModeValue(MoonIcon, SunIcon );

    // Return a button that toggles the color mode
    return (
        <IconButton
            size="md"
            icon={<SwitchIcon />}
            onClick={toggleColorMode}
            aria-label={`Switch to ${text} mode`}
            variant="ghost"
        />
    );

}
