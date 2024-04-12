import React from "react";
import {Flex, Box} from "@chakra-ui/react";

export const Footer: React.FC = () => {
    return (
        <Flex as={"footer"}
              justify={"space-between"}
              align={"center"}
              w={"100%"}
              wrap={"nowrap"}
              p={"1"}
              pr={3}
              pl={3}
        >
            <Box as={"div"} fontSize={"xs"}>Benedict</Box>
            <Box fontSize={"xs"}>MainPage</Box>
            <Box fontSize={"xs"}>Gregory</Box>
        </Flex>
    );
}
