import React, {useCallback} from "react";
import {Box,  Button, Grid, Flex} from "@chakra-ui/react";
import {HOME_ROUTE} from "../../shared/constants";
import {Location, NavigateFunction, useNavigate} from "react-router";
import {useLocation} from "react-router-dom";
import {useCommonStore, } from "../../shared/store/zustand";
import {useUserStore} from "../../shared/store/zustand";
// import {timeFormat} from "../../features/common/timeFormat.ts";
import useOptions from "../../shared/hooks/use-options.tsx";
import {timeFormat} from "../../features/common/timeFormat.ts";


export const Footer: React.FC = () => {
    const navigate: NavigateFunction = useNavigate()
    const {isDark,gTrans,buttonStyle}=useOptions()
    const isStart: boolean = useCommonStore(store => store.isStart)
    const location: Location = useLocation()
    const mistakes: number = useCommonStore(store => store.mistakes)
    const userName = useUserStore(store => store.currentUser.username)
    const saveVocabulariesToServer=useUserStore(store=>store.saveVocabulariesToServer)
    const userRecord = useUserStore(store => store.currentUser.userRecord)

    const handle = useCallback(() => {
        saveVocabulariesToServer()
        navigate(HOME_ROUTE)
    }, []);

    return (
        <Box as={Flex}
             flex={"auto"}
             justifyContent={"center"}
             alignItems={"center"}
             backgroundColor={`${isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'}`}
             backdropFilter="blur(10px)"
             boxShadow={isDark ? "0 8px 8px 0 rgba(0, 0, 0, 0.37)" : "0 8px 8px 0 rgba(91, 114, 120, 0.37)"}
             border="1px solid rgba(255, 255, 255, 0.18)"
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
                {location.pathname !== HOME_ROUTE &&
                  <Button
                      {...buttonStyle}
                      w={'auto'}
                      m={1}
                      h={"auto"}
                      px={4}
                      py={2}
                      isDisabled={isStart}
                      fontSize={"small"}
                      justifySelf={"center"}
                      onClick={() => handle()}>
                      {gTrans("Home Page")}
                  </Button>}
                {location.pathname === HOME_ROUTE &&
                  <Flex pt={3}
                       fontSize={"small"}
                        display={{base: "block", sm: "none"}}
                       px={2}
                        gap={2}
                       justifySelf={"center"}>
                      {userName}
                      {"'s "}
                      {userRecord > 0 ? `${gTrans("Record")}  ${timeFormat(userRecord)}` : gTrans("No records")}
                  </Flex>}
                <Box pt={3}
                     display={{base: "none", sm: "block", md: "block", lg: "block", xl: "block", "2xl": "block"}}
                     fontSize={"small"}
                     px={2}
                     justifySelf={"end"}>
                    {userRecord > 0 ? `${gTrans("Record")}  ${timeFormat(userRecord)}` : gTrans("No records")}
                    {mistakes > 0 &&
                      <span color={isDark ? 'red.400' : 'red.700'}>
                    {mistakes > 0 && ` /   ${gTrans("Mistakes")}: ${mistakes}`}
                </span>
                    }
                </Box>
            </Grid>
        </Box>

    );
}
