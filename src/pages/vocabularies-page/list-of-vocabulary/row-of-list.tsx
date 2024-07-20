import {Box, Button, Checkbox, Flex, useColorModeValue} from "@chakra-ui/react";
import {useDictModal, useUser} from "../../../shared/store/zustand";
import AdaptiveText from "../../../components/adaptive-text/adaptive-text.tsx";
import {IVocabularyItem} from "../../../shared/types.ts";

interface IRowProps {
    vocabulary: IVocabularyItem[];
    index: number;
    style: React.CSSProperties; // Добавляем style в интерфейс
}

export const Row = ({vocabulary, index, style}: IRowProps) => {
    const setEditWord = useDictModal((state) => state.setEditWord)
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const colorUI = useUser(store => store.currentUser.colorUI)

    const handler = () => {

        setEditWord(vocabulary[index], index)
        // props.onOpen()
    }

    return (
        <Button as={Flex}
                flexDirection={"row"}
                key={index}
                rounded={0}
                style={{
                    ...style,
                    background: index % 2
                        ? (isDark ? 'rgba(40, 40, 40, 0.7)' : 'rgba(240, 240, 240, 0.7)')
                        : (isDark ? 'rgba(10, 10, 10, 0.7)' : 'rgba(220, 220, 220, 0.7)'),
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'normal'
                }}
        >
            <Flex
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
                    {vocabulary[index].mean}
                </p>
                <AdaptiveText initialFontSize={16} text={vocabulary[index].translate}/>
            </Flex>
            <Box>
                <Checkbox size={{base: 'md', sm: 'md', md: 'lg', lg: 'lg', xl: 'lg', '2xl': 'lg'}}
                          colorScheme={colorUI}
                />
            </Box>
        </Button>
    )
}

