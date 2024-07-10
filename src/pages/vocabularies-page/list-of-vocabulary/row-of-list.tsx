import {Button, Flex, useColorModeValue} from "@chakra-ui/react";
import {useDictModal} from "../../../shared/store/zustand";
import AdaptiveText from "../../../components/adaptive-text/adaptive-text.tsx";
import {IVocabularyItem} from "../../../shared/types.ts";

export const Row = (props: { style: React.CSSProperties,vocabulary: IVocabularyItem[], index: number, isOpen: boolean, onOpen: () => void }) => {
    const setEditWord = useDictModal((state) => state.setEditWord)
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const vocabulary: IVocabularyItem[] = props.vocabulary
    const handler = () => {

        setEditWord(vocabulary[props.index], props.index)
        // props.onOpen()

    }


    return (
        <Button
            as={Flex}
            key={props.index}
            style={{
                ...props.style,
                background: props.index % 2
                    ? (isDark ? 'rgba(40, 40, 40, 0.7)' : 'rgba(240, 240, 240, 0.7)')
                    : (isDark ? 'rgba(10, 10, 10, 0.7)' : 'rgba(220, 220, 220, 0.7)'),
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                whiteSpace: 'normal'
            }}
            rounded={0}
            display="flex"
            flexDirection="column"  // Изменено на column
            alignItems="center"     // Центрирование по горизонтали
            justifyContent="center" // Центрирование по вертикали
            onClick={() => handler()}
            width="100%"            // Убедитесь, что кнопка занимает всю доступную ширину
            padding="1px"          // Добавьте отступы по вкусу
        >
            <p style={{
                width: '100%',
                wordBreak: 'break-word',
                textAlign: 'center',
                fontWeight: 'bold',
            }}>
                {vocabulary[props.index].mean}
            </p>
            <AdaptiveText initialFontSize={16} text={vocabulary[props.index].translate} />
        </Button>
    )
}

