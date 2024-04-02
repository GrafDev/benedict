import {IconButton, useColorMode, useColorModeValue} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";

export const ColorSwitcher = () => {
    const {toggleColorMode} = useColorMode();
    const text:string = useColorModeValue('dark', 'light');
    const SwitchIcon= useColorModeValue(MoonIcon, SunIcon );
    return (
        <IconButton
            icon={<SwitchIcon />}
            onClick={toggleColorMode}
            aria-label={`Switch to ${text} mode`}
            variant="ghost"
        />
    );
}