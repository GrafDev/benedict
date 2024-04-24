import { Button, Tooltip, useColorModeValue} from "@chakra-ui/react";
import {getFullTranslate, getTooltipTranslate} from "../../features/toGame";
import {useDict} from "../../shared/store/zustand/store.ts";
import {useEffect, useState} from "react";

export const Row = (props: any) => {

    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const mainDict = useDict((state) => state.mainDict)
    const [fullTranslate, setFullTranslate] = useState(getFullTranslate(mainDict[props.index]))
const [tooltipTranslate, setTooltipTranslate] = useState(getFullTranslate(mainDict[props.index]))

    useEffect(() => {
        setFullTranslate(getFullTranslate(mainDict[props.index]))
        setTooltipTranslate(getTooltipTranslate(mainDict[props.index]))
    }, []);

    return (
        <Tooltip label={tooltipTranslate}
                 placement='top-start'
                 closeDelay={300}
                 openDelay={300}
                 hasArrow arrowSize={10}>
            <Button
                style={{
                    ...props.style,
                    background: props.index % 2
                        ? (isDark ? 'rgba(40, 40, 40, 0.7)' : 'rgba(240, 240, 240, 0.7)')
                        : (isDark ? 'rgba(10, 10, 10, 0.7)' : 'rgba(220, 220, 220, 0.7)'),
                }}
                key={props.index}
                rounded={0}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"start"}
                pl={2}
                pr={2}>
                {mainDict[props.index].word}
                {" - "}
                {fullTranslate}
            </Button>
        </Tooltip>

    )
}
