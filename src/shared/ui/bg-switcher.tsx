import {Button, Tooltip} from "@chakra-ui/react";
import {useCommon} from "../store/zustand";
import React from "react";
import {PiSelectionBackground, PiSelectionBackgroundDuotone} from "react-icons/pi";
import {useUser} from "../store/zustand";

export const BGSwitcher: React.FC = () => {
    const isStart: boolean = useCommon(state => state.isStart)
    const isBG: boolean = useUser(state => state.currentUser.isBG)
    const toggleBG = useUser(state => state.toggleBG)

    const handleClick = () => {
        toggleBG(!isBG)
    }

    return (
        <Tooltip label={isBG ? "Background off" : "Background on"} aria-label='A tooltip' openDelay={500}
                 closeDelay={200}>

            <Button variant={"ghost"}
                    isDisabled={isStart}
                    onClick={handleClick}
                    p={0}
                    _hover={{
                        cursor: isStart ? "not-allowed" : "pointer"
                    }}
                    _active={{
                        cursor: isStart ? "not-allowed" : "pointer"
                    }}
                    leftIcon={isBG ? <PiSelectionBackground/> : <PiSelectionBackgroundDuotone/>}
            />

        </Tooltip>

    );

}
