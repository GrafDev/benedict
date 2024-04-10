import {Box, Flex,Text} from "@chakra-ui/react";

/**
 * Functional component for a Timer.
 *
 * @return {JSX.Element} The Timer component
 */
export const Timer: React.FC = () => {
    return (

            <Flex justify={"center"}
                  maxW={"720px"}
                  mx={"auto"}
                  wrap={"nowrap"}
            >
                <Box>
                    <Text fontSize={'sm'}>Timer</Text>
                </Box>
            </Flex>

    );
}