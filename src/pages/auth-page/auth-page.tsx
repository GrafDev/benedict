import { useUser} from "../../shared/store/zustand";
import {useCallback, useEffect, useState} from "react";
import {
    Text,
    Button,
    useDisclosure,
    VStack,
    Flex,
    Card,
    CardHeader, Avatar, Heading, Box, IconButton, CardBody, useColorModeValue
} from "@chakra-ui/react";
import {IUser, TUserOptions} from "../../shared/types.ts";
import {UserModal} from "../../widgets/user-modal";
import {IoExitOutline} from "react-icons/io5";
import {ChangeColor} from "../../widgets/changeColor";
import {useNavigate} from "react-router";
import {DICTIONARY_LINK} from "../../shared/constants-ui.ts";


export const AuthPage = () => {
    const isAuth: boolean = useUser((state) => state.isAuth);
    const currentUser: IUser | undefined = useUser((state) => state.currentUser);
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [userOptions, setUserOptions] = useState<TUserOptions>("SignUp")
    const [user, setUser] = useState<IUser | undefined>(currentUser)
    const colorUI = useUser(store => store.currentUser.colorUI)
    const navigate = useNavigate()
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';




useEffect(() => {
    setUser(currentUser)
}, [currentUser]);


const handleMenuItemClick = useCallback((command: string) => {
    switch (command) {
        case "SignIn":
            setUserOptions("SignIn")
            onOpen()
            break;
        case "SignUp":
            setUserOptions("SignUp")
            onOpen()
            break;
        case "Edit":
            navigate(DICTIONARY_LINK)
            break;
        case "Exit":
            setUserOptions("Exit")
            onOpen()
            break;
        default:
            break;
    }
}, []);

const buttonStyles = {
    w: '90%',
    minW: '200px',
    rounded: 100,
    m: 1,
    pl: 10,
    pr: 10,
    colorScheme: colorUI,
    boxShadow: 'md',
    // border: '2px solid',
    _hover: {
        // background: isDark ? 'gray.800' : 'gray.300',
        boxShadow: 'dark-lg',
        transform: 'scale(1.03)',
        border:isDark?"2px solid "+colorUI:undefined
    },
};

return (

    <VStack
        display={"flex"}
        justifySelf={"start"}
        alignItems={"center"}
        w={"100%"}
        h={"100%"}

        mt={6}
        p={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
        fontSize={{base: "lg", sm: "lg", md: "x-large", lg: "x-large", xl: "xx-large", "2xl": "xxx-large"}}
    >

        <Card maxW='md'>
            <CardHeader>
                <Flex gap='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={user ? user.username : "Guest"}
                                background={`${colorUI}.200`}
                            // background={isDark ? backgroundColor.dark : backgroundColor.light}
                            // color={isDark ? backgroundColor.light : backgroundColor.dark}
                        />
                        <Box>
                            <Heading size='sm'>{user ? user.username : "Login or register"}</Heading>
                        </Box>
                    </Flex>
                    {isAuth && <IconButton
                        variant='ghost'
                        colorScheme={colorUI}
                        aria-label='See menu'
                        size={"20px"}
                        icon={<IoExitOutline/>}
                        _hover={{
                            color: `${colorUI}.800`,
                        }}
                        onClick={() => handleMenuItemClick("Exit")}
                    />}
                </Flex>
            </CardHeader>
            <CardBody>
                <ChangeColor/>
                <Text mb={2} fontSize={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "xl", "2xl": "2xl"}}>
                    {!isAuth && "Please, log in or register. " +
                        "Because, If you register, " +
                        "you will be able to save your custom\n" +
                        "dictionary to the server so that you can later\n" +
                        "use it for further training. "}

                </Text>
                {isAuth && <Button
                    {...buttonStyles}
                    onClick={() => handleMenuItemClick("Edit")}>
                    {"User Dictionary"}
                </Button>}
            </CardBody>
        </Card>
        <Flex h={"100%"}
              direction={"column"}
              justifyContent={"start"}>
            <VStack>
                {!isAuth && <Button
                    {...buttonStyles}
                    onClick={() => handleMenuItemClick("SignIn")}>
                    {"Login"}
                </Button>}
                {!isAuth && <Button
                    {...buttonStyles}
                    onClick={() => handleMenuItemClick("SignUp")}>
                    {"Sign Up"}
                </Button>}
            </VStack>
        </Flex>

        <UserModal isOpen={isOpen} onClose={onClose} userOptions={userOptions}/>
    </VStack>
)
}

