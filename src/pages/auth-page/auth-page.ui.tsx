import {useUser} from "../../shared/store/zustand/store-user.ts";
import {useCallback, useEffect, useState} from "react";
import {Text, Button, GridItem, useColorModeValue, useDisclosure, VStack, Box} from "@chakra-ui/react";
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
        "SignIn": "SignIn",
        "SignUp": "SignUp",
        "Save": "Edit Account"
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
            case "Save":
                setUserOptions("Save")
                onOpen()
                console.log("Edit")
                break;
            default:
                break;
        }
    }, []);

    return (

        <VStack
            display={"flex"}
            justifySelf={"start"}
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"100%"}
            h={"100%"}
            p={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
            fontSize={{base: "lg", sm: "lg", md: "x-large", lg: "x-large", xl: "xx-large", "2xl": "xxx-large"}}
        >
            <Box>
                <Text fontWeight={"bold"}>
                    {user ? user.name : "Login or register"}
                </Text>
                <Text>
                    {user?.email}
                </Text>
            </Box>
            <VStack>
                {Object.entries(buttonList).map(([key, value]) => (
                    (key !== "Save" || user) &&
                    <GridItem as={Button}
                              key={key}
                              w={'90%'}
                              maxW={"200px"}
                              rounded={100}
                              m={2}
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

            <UserModal isOpen={isOpen} onClose={onClose} userOptions={userOptions}/>
        </VStack>
    )
}