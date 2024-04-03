import {Box, Flex,Text} from "@chakra-ui/react";

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