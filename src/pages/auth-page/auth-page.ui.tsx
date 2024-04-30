import {useUser} from "../../shared/store/zustand/store-user.ts";
import {useCallback, useEffect} from "react";
import {Text, Button, GridItem, useColorModeValue, useDisclosure, VStack} from "@chakra-ui/react";
import {DictModal} from "../../widgets/dict-modal";
import {useUI} from "../../shared/store/zustand";
import {IUser} from "../../shared/types.ts";
import {defaultUser} from "../../shared/store/constants-store/default-user.ts";

export const AuthPage = () => {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const currentUser:  IUser = useUser((state) => state.currentUser);
    const setCurrentUser = useUser((state) => state.setCurrentUser);
    const backgroundColor: { light: string, dark: string } = useUI(store => store.backgroundColor)
    const {isOpen, onOpen, onClose} = useDisclosure()

    useEffect(() => {
        setCurrentUser(defaultUser)
    }, []);

    const buttonList: { [key: string]: string } = {
        "addWord": "Add word",
        "change Dictionary": "Change Dictionary",
    }
    const handleMenuItemClick = useCallback((command: string) => {
        console.log(`Вы выбрали команду: ${command}`);
        switch (command) {
            case "addWord":
                onOpen()
                break;
            case "change Dictionary":
                console.log("change Dictionary")
                break;
            default:
                break;
        }
    }, []);

    return (

        <VStack
            display={"flex"}
            justifySelf={"start"}
            justifyContent={"start"}
            alignItems={"left"}
            w={"100%"}
            h={"100%"}
            p={{base: "1", sm: "1", md: "2", lg: "2", xl: "3", "2xl": "3"}}
            fontSize={{base: "lg", sm: "lg", md: "x-large", lg: "x-large", xl: "xx-large", "2xl": "xxx-large"}}
        >
            <Text fontWeight={"bold"}>
                {currentUser.name}
            </Text>
                {Object.entries(buttonList).map(([key, value]) => (

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
            <UserModal isOpen={isOpen} onClose={onClose}/>
        </VStack>
    )
}