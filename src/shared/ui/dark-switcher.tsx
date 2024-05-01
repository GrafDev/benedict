import {Button, Tooltip, useColorMode, useColorModeValue} from "@chakra-ui/react";
import {DarkModeSwitch} from "react-toggle-dark-mode";
import {useCommon} from "../store/zustand";

export const DarkSwitcher = () => {
    const {toggleColorMode} = useColorMode();
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const isStart: boolean = useCommon(state => state.isStart)
    return (
        <Tooltip label={isDark ? "Dark mode" : "Light mode"} aria-label='A tooltip' openDelay={500} closeDelay={200}>

            <Button variant={"ghost"}
                    isDisabled={isStart}
                    pl={0}
                    _hover={{
                        cursor: isStart ? "not-allowed" : "pointer"
                    }}
                    _active={{
                        cursor: isStart ? "not-allowed" : "pointer"
                    }}
            >
                <DarkModeSwitch
                    onChange={toggleColorMode}
                    checked={isDark}
                    style={{cursor: isStart ? "not-allowed" : "pointer"}}
                />
            </Button>
        </Tooltip>

    );

}
