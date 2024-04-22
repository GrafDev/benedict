import React from "react";
import {Flex, Box, useColorModeValue} from "@chakra-ui/react";
import {useLocation} from "react-router-dom";

export const Footer: React.FC = () => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const location = useLocation();
    return (
        <Flex as={"footer"}
              justify={"space-between"}
              align={"center"}
              fontSize={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "x-large", "2xl": "x-large"}}
              background={isDark ? 'rgba(10, 10, 10, 0.95)' : 'rgba(250, 250, 250, 0.95)'}
              w={"100%"}
              wrap={"nowrap"}
              p={"1"}
              pr={3}
              pl={3}
        >
            <Box as={"div"} fontSize={"xs"}>Benedict</Box>
            <Box fontSize={"xs"}>{location.state}</Box>
            <Box fontSize={"xs"}>Gregory</Box>
        </Flex>
    );
}
