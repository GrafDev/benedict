import React, {useCallback} from "react";
import {Box, useColorModeValue, Button, Grid} from "@chakra-ui/react";
import {HOME_LINK} from "../../shared/constants-link.ts";
import {Location, NavigateFunction, useNavigate} from "react-router";
import {useLocation} from "react-router-dom";
import {useCommon} from "../../shared/store/zustand";
import {useUser} from "../../shared/store/zustand";
import {timeFormat} from "../../features/common/timeFormat.ts";
import {buttonStyles} from "../../shared/ui/button-style.ts";


export const Footer: React.FC = () => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const navigate: NavigateFunction = useNavigate()
    const isStart: boolean = useCommon(store => store.isStart)
    const location: Location = useLocation()
    const mistakes: number = useCommon(store => store.mistakes)
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
              py={1}
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
                    {...buttonStyles(colorUI)}
                    w={'auto'}
                    m={1}
                    h={"auto"}
                    px={4}
                    py={2}
                    isDisabled={isStart}
                    fontSize={"small"}
                    justifySelf={"center"}
                    onClick={() => handle()}>
                    {translations[language].homePage}
                </Button>}
            <Box p={2}
                 display={{base: "none", sm: "block", md: "block", lg: "block", xl: "block", "2xl": "block"}}
                 fontSize={"small"}
                 justifySelf={"center"}>
                {userRecord>0? `${translations[language].record}  ${timeFormat(userRecord)}`: translations[language].noRecords}
                {mistakes>0 &&
                <span color={isDark ? 'red.400' : 'red.700'}>
                    {mistakes > 0 && ` /   ${translations[language].mistakes}: ${mistakes}`}
                </span>
                }
            </Box>
        </Grid>
    );
}
