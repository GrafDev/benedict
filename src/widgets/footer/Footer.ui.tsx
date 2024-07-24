import React, {useCallback} from "react";
import {Box, useColorModeValue, Button, Grid, Flex} from "@chakra-ui/react";
import {HOME_LINK} from "../../shared/constants-link.ts";
import {Location, NavigateFunction, useNavigate} from "react-router";
import {useLocation} from "react-router-dom";
import {useCommon, useUI} from "../../shared/store/zustand";
import {useUser} from "../../shared/store/zustand";
import {timeFormat} from "../../features/common/timeFormat.ts";
import {buttonStyles} from "../../shared/ui/button-style.ts";


export const Footer: React.FC = () => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const navigate: NavigateFunction = useNavigate()
    const colorUI = useUI(state => state.colorUI)
    const isStart: boolean = useCommon(store => store.isStart)
    const location: Location = useLocation()
    const mistakes: number = useCommon(store => store.mistakes)
    const userName = useUser(store => store.currentUser.username)
    const userRecord = useUser(store => store.currentUser.options.userRecord)
    const translations = useUI(state => state.translations)
    const language = useUI(state => state.language)
    const backgroundColor = useUI(state => state.backgroundColor)

    const handle = useCallback(() => {
        navigate(HOME_LINK)
    }, []);

    return (
        <Box as={Flex}
             flex={"auto"}
             justifyContent={"center"}
             alignItems={"center"}
             backgroundColor={isDark ? backgroundColor.dark : backgroundColor.light}
        >
            <Grid as={"footer"}
                  templateColumns={"repeat(auto-fit, minmax(100px, 1fr))"}
                  fontSize={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "large", "2xl": "large"}}
                  justifySelf={"center"}
                  maxW={"720px"}
                  w={"100%"}
                  minH={14}
                  py={1}
            >


                <Box
                     pt={3}
                     maxW={"720px"}
                     px={2}
                     fontWeight={"bold"}
                     display={{base: "none", sm: "block", md: "block", lg: "block", xl: "block", "2xl": "block"}}
                     justifySelf={"start"}
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
                {location.pathname === HOME_LINK &&
                  <Flex pt={3}
                       fontSize={"small"}
                        display={{base: "block", sm: "none"}}
                       px={2}
                        gap={2}
                       justifySelf={"center"}>
                      {userName}
                      {"'s "}
                      {userRecord > 0 ? `${translations[language].record}  ${timeFormat(userRecord)}` : translations[language].noRecords}
                  </Flex>}
                <Box pt={3}
                     display={{base: "none", sm: "block", md: "block", lg: "block", xl: "block", "2xl": "block"}}
                     fontSize={"small"}
                     px={2}
                     justifySelf={"end"}>
                    {userRecord > 0 ? `${translations[language].record}  ${timeFormat(userRecord)}` : translations[language].noRecords}
                    {mistakes > 0 &&
                      <span color={isDark ? 'red.400' : 'red.700'}>
                    {mistakes > 0 && ` /   ${translations[language].mistakes}: ${mistakes}`}
                </span>
                    }
                </Box>
            </Grid>
        </Box>

    );
}
