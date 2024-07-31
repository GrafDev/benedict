import {HStack, Text} from "@chakra-ui/react"

interface ITextLinesProps {
    index:number
}
const TestLines = ({index}:ITextLinesProps) => {
    return (

        <HStack>
            <Text>
                {index}
                -</Text>
            </HStack>
    )
}

export default TestLines