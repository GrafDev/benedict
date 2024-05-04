import React, {useCallback} from "react";
import { Box, useColorModeValue, Button, Grid} from "@chakra-ui/react";
import {HOME_LINK} from "../../shared/constants-ui.ts";
import {Location, NavigateFunction, useNavigate} from "react-router";
import {useLocation} from "react-router-dom";
import {useCommon, useUI} from "../../shared/store/zustand";
import {useUser} from "../../shared/store/zustand/store-user.ts";

export const Footer: React.FC = () => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const backgroundColor: { dark: string, light: string } = useUI(store => store.backgroundColor)
    const loading = useUser((state) => state.loading)
    const navigate: NavigateFunction = useNavigate()
    const isStart: boolean = useCommon(store => store.isStart)
    const location: Location = useLocation()

    const handle = useCallback(() => {
        navigate(HOME_LINK)
    }, []);

    return (
        <Grid as={"footer"}
              templateColumns={"repeat(auto-fit, minmax(100px, 1fr))"}
              justifyContent={"space-between"}
              fontSize={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "x-large", "2xl": "x-large"}}
              background={isDark ? 'rgba(10, 10, 10, 0.95)' : 'rgba(250, 250, 250, 0.95)'}
              w={"100%"}
              pr={3}
              pl={3}
        >

            <Box as={"div"}
                 p={2}
                 display={{base: "none", sm: "block", md: "block", lg: "block", xl: "block", "2xl": "block"}}
                 justifySelf={"center"}
                 fontSize={"small"}>

                Benedict
            </Box>
            {location.pathname !== HOME_LINK &&
                <Button
                    w={'auto'}
                    m={1}
                    pr={4} pl={4} pt={1} pb={1}
                    isDisabled={isStart}
                    rounded={15}
                    fontSize={"sm"}
                    justifySelf={"center"}
                    size={"x-md"}
                    background={isDark ? backgroundColor.dark : backgroundColor.light}
                    border={isDark ? '1px solid #F7FAFC' : '1px solid #1A202C'}
                    boxShadow={"md"}
                    _hover={{
                        background: isDark ? 'gray.800' : 'gray.300',
                        transform: 'scale(1.1)',
                    }}
                    onClick={() => handle()}>
                    Home page
                </Button>}
            <Box p={2}
                 display={{base: "none", sm: "block", md: "block", lg: "block", xl: "block", "2xl": "block"}}
                 fontSize={"small"}
                 justifySelf={"center"}>
                {loading?"true":"false"}
            </Box>
        </Grid>
    );
}
