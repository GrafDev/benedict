

import {Button, Tooltip} from "@chakra-ui/react";
import {useCommon} from "../../shared/store/zustand";
import {AUTH_LINK} from "../../shared/constants-ui.ts";
import {RiAccountBoxLine} from "react-icons/ri";
import {useNavigate} from "react-router";


export const AccountButton = () => {
    const isStart: boolean = useCommon(state => state.isStart)
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(AUTH_LINK)
    }

    return (
        <Tooltip label={"Account"} aria-label='A tooltip' openDelay={500}
                 closeDelay={200}>

            <Button variant={"ghost"}
                    isDisabled={isStart}
                    onClick={handleClick}
                    display={{"base": "none","sm": "inline", "md": "inline", "lg": "inline", "xl": "inline", "2xl": "inline"}}
                    p={0}
                    _hover={{
                        cursor: isStart ? "not-allowed" : "pointer"
                    }}
                    _active={{
                        cursor: isStart ? "not-allowed" : "pointer"
                    }}
                    leftIcon={<RiAccountBoxLine size={'1.5em'}/>}
            />

        </Tooltip>

    );

}
