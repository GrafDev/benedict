import {Button, Tooltip} from "@chakra-ui/react";
import {useCommon, useUI} from "../store/zustand";
import React from "react";
import {PiSelectionBackground, PiSelectionBackgroundDuotone} from "react-icons/pi";

export const BGSwitcher: React.FC = () => {
    const isStart: boolean = useCommon(state => state.isStart)
    const isBG: boolean = useUI(state => state.isBG)
    const setIsBG = useUI(state => state.setIsBG)

    const handleClick = () => {
        setIsBG(!isBG)
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
