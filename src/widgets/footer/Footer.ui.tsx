import React, {useCallback} from "react";
import {Box, useColorModeValue, Button, Grid} from "@chakra-ui/react";
import {HOME_LINK} from "../../shared/constants-ui.ts";
import {Location, NavigateFunction, useNavigate} from "react-router";
import {useLocation} from "react-router-dom";
import {useCommon} from "../../shared/store/zustand";
import {useUser} from "../../shared/store/zustand";
import {timeFormat} from "../../features/common/timeFormat.ts";


export const Footer: React.FC = () => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const navigate: NavigateFunction = useNavigate()
    const isStart: boolean = useCommon(store => store.isStart)
    const location: Location = useLocation()
    const userName = useUser(store => store.currentUser.username)
    const colorUI = useUser(store => store.currentUser.colorUI)
    const userRecord = useUser(store => store.currentUser.userRecord)
    const translations = useUser(store => store.translations)
    const language = useUser(store => store.currentUser.language)

    const handle = useCallback(() => {
        navigate(HOME_LINK)
    }, []);

    return (
        <Grid as={"footer"}
              templateColumns={"repeat(auto-fit, minmax(100px, 1fr))"}
              justifyContent={"space-between"}
              fontSize={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "large", "2xl": "large"}}
              background={isDark ? 'rgba(10, 10, 10, 0.95)' : 'rgba(250, 250, 250, 0.95)'}
              w={"100%"}
              pr={3}
              pl={3}
        >

            <Box as={"div"}
                 p={2}

                 fontWeight={"bold"}
                 display={{base: "none", sm: "block", md: "block", lg: "block", xl: "block", "2xl": "block"}}
                 justifySelf={"center"}
                 fontSize={"small"}>

                {userName}
            </Box>
            {location.pathname !== HOME_LINK &&
                <Button
                    w={'auto'}
                    m={1}
                    h={"auto"}
                    pr={4} pl={4} pt={1} pb={1}
                    isDisabled={isStart}
                    rounded={10}
                    fontSize={"small"}
                    justifySelf={"center"}
                    colorScheme={colorUI}
                    boxShadow={"md"}
                    border={isDark?"1px solid "+colorUI:undefined}
                    _hover={{
                        boxShadow: 'dark-lg',
                        transform: 'scale(1.03)',
                        border:isDark?"2px solid "+colorUI:undefined
                    }}
                    onClick={() => handle()}>
                    {translations[language].homePage}
                </Button>}
            <Box p={2}
                 display={{base: "none", sm: "block", md: "block", lg: "block", xl: "block", "2xl": "block"}}
                 fontSize={"small"}
                 justifySelf={"center"}>

                {userRecord>0? `${translations[language].record}  ${timeFormat(userRecord)}`: translations[language].noRecords}


            </Box>
        </Grid>
    );
}
