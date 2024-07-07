import {Button, Flex, useColorModeValue} from "@chakra-ui/react";
import {useUser, useDictModal} from "../../../shared/store/zustand";

export const Row = (props: {style: React.CSSProperties, index: number, isOpen: boolean, onOpen: () => void }) => {
    const setEditWord = useDictModal((state) => state.setEditWord)
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const isUserDictionary = useUser(store => store.currentUser.isUserDictionary)
const vocabulary = useUser(store => store.currentVocabulary)

    const handler = () => {
        if (isUserDictionary) {
            setEditWord(vocabulary[props.index], props.index)
            console.log(vocabulary[props.index].word)
            // props.onOpen()
        }
    }

    return (
        <Button as={Flex}
            key={props.index}
                style={{
                    ...props.style,

                    background: props.index % 2
                        ? (isDark ? 'rgba(40, 40, 40, 0.7)' : 'rgba(240, 240, 240, 0.7)')
                        : (isDark ? 'rgba(10, 10, 10, 0.7)' : 'rgba(220, 220, 220, 0.7)'),
                }}
            rounded={0}
            display={"flex"}
            alignItems={"center"}
            onClick={() => handler()}
            justifyContent={"center"}>
            <p>
                {vocabulary[props.index].word}
                {" - "}
                {vocabulary[props.index].translate}
            </p>

        </Button>
    )
}

