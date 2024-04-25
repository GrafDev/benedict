import {Button, Tooltip, useColorModeValue} from "@chakra-ui/react";
import {getFullTranslate, getOneTranslateWord, getTooltipTranslate} from "../../features/toGame";
import {useDict, useDictModal} from "../../shared/store/zustand";
import {useEffect, useState} from "react";

export const Row = (props: any) => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const mainDict = useDict((state) => state.mainDict)
    const setEditWord=useDictModal((state)=>state.setEditWord)
    const [buttonTranslate, setButtonTranslate] = useState(getOneTranslateWord(mainDict[props.index]))
    const [tooltipTranslate, setTooltipTranslate] = useState(getFullTranslate(mainDict[props.index]))
    useEffect(() => {
        setButtonTranslate(getOneTranslateWord(mainDict[props.index]))
        setTooltipTranslate(getTooltipTranslate(mainDict[props.index]))
    }, []);

    const handler = () => {
        setEditWord(mainDict[props.index],props.index)
        props.onOpen()

    }

    return (
        <Tooltip label={tooltipTranslate}
                 placement='top'
                 closeDelay={300}
                 openDelay={300}
                 rounded={5}
                 fontSize={"large"}
                 hasArrow arrowSize={10}>
            <Button
                style={{
                    ...props.style,
                    background: props.index % 2
                        ? (isDark ? 'rgba(40, 40, 40, 0.7)' : 'rgba(240, 240, 240, 0.7)')
                        : (isDark ? 'rgba(10, 10, 10, 0.7)' : 'rgba(220, 220, 220, 0.7)'),
                }}
                _hover={{
                    fontSize: 'large',
                    transform: 'scale(1.1)',
                }}
                key={props.index}
                rounded={0}
                display={"flex"}
                alignItems={"center"}
                onClick={() =>handler()}
                justifyContent={"center"}>
                {mainDict[props.index].word}
                {" - "}
                {buttonTranslate}
            </Button>
        </Tooltip>

    )
}
