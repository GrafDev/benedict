import React, {useCallback} from "react";
import {Flex, Box, useColorModeValue, Button} from "@chakra-ui/react";
import {useCommon, useUI} from "../../shared/store/zustand/store.ts";
import {HOME_LINK} from "../../shared/constants.ts";
import {NavigateFunction, useNavigate} from "react-router";
import {useLocation} from "react-router-dom";

export const Footer: React.FC = () => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const backgroundColor: { dark: string, light: string } = useUI(store => store.backgroundColor)
    const navigate: NavigateFunction = useNavigate()
    const isStart: boolean = useCommon(store => store.isStart)
    const location = useLocation()

    const handle = useCallback(() => {
        navigate(HOME_LINK)
    }, []);

    return (
        <Flex as={"footer"}
              justify={"space-between"}
              align={"center"}
              fontSize={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "x-large", "2xl": "x-large"}}
              background={isDark ? 'rgba(10, 10, 10, 0.95)' : 'rgba(250, 250, 250, 0.95)'}
              w={"100%"}
              wrap={"nowrap"}
              pr={3}
              pl={3}
        >

            <Box as={"div"}
                 p={2}
                 fontSize={"small"}>
                Benedict
            </Box>
            {location.pathname !== '/' && <Button
                w={'auto'}
                pr={4}
                pl={4}
                isDisabled={isStart}
                fontSize={"small"}
                size={"sm"}
                background={isDark ? backgroundColor.dark : backgroundColor.light}
                border={isDark ? '1px solid #F7FAFC' : '1px solid #1A202C'}
                boxShadow={"md"}
                _hover={{
                    background: isDark ? 'gray.800' : 'gray.300',
                    transform: 'scale(1.02)',
                }}
                onClick={() => handle()}>
                Home page
            </Button>}
            <Box p={2} fontSize={"small"}>
  Gregory
            </Box>
        </Flex>
    );
}
