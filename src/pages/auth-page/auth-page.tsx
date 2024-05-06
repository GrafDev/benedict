import {useUser} from "../../shared/store/zustand/store-user.ts";
import {useCallback, useEffect, useState} from "react";
import {Text, Button, GridItem, useColorModeValue, useDisclosure, VStack,Flex} from "@chakra-ui/react";
import {useUI} from "../../shared/store/zustand";
import {IUser, TUserOptions} from "../../shared/types.ts";
import {UserModal} from "../../widgets/user-modal";


export const AuthPage = () => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const currentUser: IUser | undefined = useUser((state) => state.currentUser);
    const backgroundColor: { light: string, dark: string } = useUI(store => store.backgroundColor)
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [userOptions, setUserOptions] = useState<TUserOptions>("SignUp")
    const [user, setUser] = useState<IUser | undefined>(currentUser)
    useEffect(() => {
        setUser(currentUser)
    }, [currentUser]);

    const buttonList: { [key: string]: string } = {
        "SignIn": "Log In",
        "SignUp": "Sign Up",
        "Edit":"Edit Profile",
        "Exit": "Log Out"
    }
    const handleMenuItemClick = useCallback((command: string) => {
        console.log(`Вы выбрали команду: ${command}`);
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
                setUserOptions("Edit")
                onOpen()
                break;
            case "Exit":
                setUserOptions("Exit")
                onOpen()
                console.log("Exit")
                break;
            default:
                break;
        }
    }, []);

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
                <Text fontWeight={"bold"} fontSize={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "xl", "2xl": "2xl"}} >
                    {user ? user.username : "Login or register"}
                </Text>
            <Flex h={"100%"}
                  direction={"column"}
                  justifyContent={"center"}>
                <VStack>
                    {Object.entries(buttonList).map(([key, value]) => (
                        (key !== "Exit" || user) &&
                        <GridItem as={Button}
                                  key={key}
                                  w={'90%'}
                                  minW={"200px"}
                                  rounded={100}
                                  m={1}
                                  pl={10}
                                  pr={10}
                                  background={isDark ? backgroundColor.dark : backgroundColor.light}
                                  border={isDark ? '1px solid #F7FAFC' : '1px solid #1A202C'}
                                  boxShadow={"md"}
                                  onClick={() => handleMenuItemClick(key)}
                                  _hover={{
                                      background: isDark ? 'gray.800' : 'gray.300',
                                      transform: 'scale(1.1)',
                                  }}>
                            {value}
                        </GridItem>
                    ))}
                </VStack>
            </Flex>

            <UserModal isOpen={isOpen} onClose={onClose} userOptions={userOptions}/>
        </VStack>
    )
}