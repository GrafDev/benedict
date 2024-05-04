import {
    Button,
    FormControl, HStack, Input, InputGroup, InputLeftElement,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Spinner,
    Text, useColorModeValue,
} from "@chakra-ui/react";
import {IUser, TUserOptions} from "../../shared/types.ts";
import {useEffect, useState} from "react";
import {useUser} from "../../shared/store/zustand/store-user.ts";
import {nanoid} from "nanoid";
import {RiAccountBoxLine, RiLockPasswordLine} from "react-icons/ri";


export const UserModal = (
    {isOpen, onClose, userOptions,}: {
        isOpen: boolean,
        onClose: () => void,
        userOptions: TUserOptions
    }) => {

    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const currentUser: IUser | undefined = useUser((state) => state.currentUser);
    const signUpUser = useUser((state) => state.signUpUser)
    const logOutUser = useUser((state) => state.logOutUser)
    const logInUser = useUser((state) => state.logInUser)
    const updateUser = useUser((state) => state.updateUser)
    const loading = useUser((state) => state.loading)
    const setCurrentUser = useUser((state) => state.setCurrentUser)
    const [name, setName] = useState<string>(currentUser?.username || "")
    const [password, setPassword] = useState<string>("")
    const [isSpinner, setIsSpinner] = useState<boolean>(false)

    const handlerChange = (e: any) => {
        if (e.target.name === "name_password") {
            setPassword(e.target.value)
        } else if (e.target.name === "name_name") {
            setName(e.target.value)
        }
    }

    const handleClose = () => {
        if (currentUser) {
            setName(currentUser.username)
            setPassword("")
        }
        console.log("Handler close")
        onClose()
    }

    useEffect(() => {
        if (!loading){
            setIsSpinner(false)
            onClose()
        }
    }, [loading]);

    const handlerSubmit = (options?: TUserOptions) => {
        setIsSpinner(true)
        if (options === "Exit") {
            logOutUser()
            console.log("Exit")
        } else if (options === "SignIn") {
            logInUser(name, password)
            console.log("SignIn")
        } else if (options === "Edit") {
            setCurrentUser({...currentUser, username: name})
            updateUser()
            console.log("Edit")
        } else if (options === "SignUp") {
            console.log("SignUp")
            signUpUser(name, password)
        }

    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            // Вызов функции сохранения
            handlerSubmit();
        }
        if (event.key === 'Escape') {
            // Вызов функции закрытия
            handleClose();
        }
    });

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            closeOnOverlayClick={false}
            isCentered>
            <ModalOverlay
                background={isDark ? 'rgba(10, 10, 10, 0.7)' : 'rgba(250, 250, 250, 0.6)'}/>
            <ModalContent>
                <ModalHeader justifyItems={"space-between"}
                             alignItems={"center"}
                             display={"flex"}
                             justifyContent={"space-between"}
                             ml={5}>
                    <Text>
                        {userOptions !== "Exit" ? userOptions : "Are you sure?"}
                        {" "}
                        {userOptions !== "Exit" && name}
                    </Text>
                </ModalHeader>
                <ModalCloseButton/>
                <FormControl onSubmit={() => handlerSubmit()}>
                    <ModalBody>
                        {userOptions !== "Exit" &&
                            <InputGroup
                                size={{base: "sm", sm: "sm", md: "md", lg: "md", xl: "lg", "2xl": "lg",}}
                                mb={1}
                            >
                                <InputLeftElement pointerEvents='none'>
                                    <RiAccountBoxLine/>
                                </InputLeftElement>
                                <Input roundedRight={5}
                                       id={nanoid()}
                                       type={"text"}
                                       name={"name_name"}
                                       required={true}
                                       value={name}
                                       onChange={handlerChange}
                                       placeholder='User name'
                                />
                            </InputGroup>}
                        {userOptions !== "Exit" && userOptions !== "Edit" &&
                            <InputGroup
                                size={{base: "sm", sm: "sm", md: "md", lg: "md", xl: "lg", "2xl": "lg",}}
                                mb={1}
                            >
                                <InputLeftElement pointerEvents='none'>
                                    <RiLockPasswordLine/>
                                </InputLeftElement>
                                <Input roundedRight={5}
                                       id={nanoid()}
                                       type={"password"}
                                       name={"name_password"}
                                       required={true}
                                       value={password}
                                       onChange={handlerChange}
                                       placeholder='password'
                                />
                            </InputGroup>}

                    </ModalBody>

                    <ModalFooter as={HStack}
                                 justifyContent={"space-between"}>
                        <Button variant='outline'
                                size={{base: "sm", sm: "sm", md: "md", lg: "md", xl: "lg", "2xl": "lg"}}
                                type={"submit"}
                                colorScheme={"blue"}
                                onClick={() => handlerSubmit(userOptions)}
                        >
                            {userOptions === "SignUp" && !isSpinner && "Sign Up"}
                            {userOptions === "SignIn" && !isSpinner && "Login"}
                            {userOptions === "Exit" && !isSpinner && "Exit"}
                            {userOptions === "Edit" && !isSpinner && "Save"}

                            {isSpinner && <Spinner size='sm'/>}

                        </Button>
                        <Button variant={"outline"}
                                size={{base: "sm", sm: "sm", md: "md", lg: "md", xl: "lg", "2xl": "lg"}}
                                onClick={handleClose}>
                            Cancel
                        </Button>

                    </ModalFooter>
                </FormControl>

            </ModalContent>
        </Modal>
    )
}