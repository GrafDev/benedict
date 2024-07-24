import {
    Avatar,
    Box,
    Flex,
    Heading,
    Text, IconButton,
    useColorModeValue,
} from "@chakra-ui/react";

import {Fade} from "react-awesome-reveal";
import {useUI, useUser} from "../../shared/store/zustand";
import {IoExitOutline} from "react-icons/io5";
import {auth} from "../../shared/store/firebase/firebase.ts";
import {onAuthStateChanged, signOut, User} from "firebase/auth";
import {useEffect, useState} from "react";

const AuthDetails = () => {
    const colorUI = useUI(state => state.colorUI)
    const colorElement = `${colorUI}.600`
    const isDark = useColorModeValue('light', 'dark') === 'dark';
    const backgroundColor = useUI(state => state.backgroundColor)
    const setAuth = useUser(state => state.setIsAuth)
    const [authUser, setAuthUser] = useState<User | null>(null)

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
                console.log("setAuthUser", user.email)
            } else {
                setAuthUser(null)
            }
        })
        return () => listen()
    }, []);

    const handleExit = () => {
        signOut(auth).then(() => {
            console.log("signOut")
            setAuth(false)
            localStorage.removeItem('rememberedUser');
        }).catch(console.error);
        console.log("handleExit")
    }

    return (
        <Fade>
            <Box w={["full"]}
                 backgroundColor={isDark ? backgroundColor.dark : backgroundColor.light}
                 mt={[20, "10vh"]}
                 border={["none", "1px"]}
                 borderColor={['', colorElement]}
                 rounded={[0, 4, 10, 15]}
                 p={[5, 10, 10, 10]}
            >

                <Flex flex='1' gap='4' justifyContent={["center", "flex-start"]} alignItems={"center"} flexWrap='wrap'>
                    <Avatar name={authUser ? authUser.email || "User" : "Guest"}
                            background={`${colorUI}.200`}
                    />
                    <Box>
                        <Heading size='sm'>
                            <Text overflowWrap="break-word"
                                  wordBreak="break-word"
                                  whiteSpace="normal"
                                  maxWidth="100%">

                                {authUser?.email}
                            </Text>
                        </Heading>
                    </Box>

                    <IconButton
                        variant='ghost'
                        colorScheme={colorUI}
                        aria-label='See menu'
                        icon={<IoExitOutline/>}
                        _hover={{
                            color: `${colorUI}.800`,
                        }}
                        onClick={handleExit}
                    />

                </Flex>
            </Box>
        </Fade>
    )
}

export default AuthDetails;