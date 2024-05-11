import {Button, Tooltip, useColorModeValue} from "@chakra-ui/react";
import {getFullTranslateWord, getOneTranslateWord, getTooltipTranslate} from "../../features/toGame";
import {useUser, useDictModal} from "../../shared/store/zustand";
import {useEffect, useState} from "react";

export const Row = (props: any) => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const currentDict = useUser((state) => state.currentDict)
    const setEditWord=useDictModal((state)=>state.setEditWord)
    const [buttonTranslate, setButtonTranslate] = useState(getOneTranslateWord(currentDict[props.index]))
    const [tooltipTranslate, setTooltipTranslate] = useState(getFullTranslateWord(currentDict[props.index]))


    useEffect(() => {
        setButtonTranslate(getOneTranslateWord(currentDict[props.index]))
        setTooltipTranslate(getTooltipTranslate(currentDict[props.index]))
    }, []);

    const handler = () => {
        setEditWord(currentDict[props.index],props.index)
        props.onOpen()
    }

    return (
        <Tooltip label={tooltipTranslate}
                 placement='top'
                 closeDelay={50}
                 openDelay={400}
                 rounded={5}
                 fontSize={"medium"}
                 closeOnScroll={true}
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
                {currentDict[props.index].word}
                {" - "}
                {buttonTranslate}
            </Button>
        </Tooltip>

    )
}
