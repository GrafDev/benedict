import {Button, useColorMode, useColorModeValue} from "@chakra-ui/react";
import {DarkModeSwitch} from "react-toggle-dark-mode";
import {useCommon} from "../store/zustand/store.ts";

export const ColorSwitcher = () => {
    const {toggleColorMode} = useColorMode();
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const isStart:boolean = useCommon(state => state.isStart)
    return (
        <Button variant={"ghost"}
                isDisabled={isStart}
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

    );

}
