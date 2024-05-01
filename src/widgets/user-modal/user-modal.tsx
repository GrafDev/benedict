import {
    Button,
    FormControl, HStack, Input, InputGroup,  InputLeftElement,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,  useColorModeValue
} from "@chakra-ui/react";
import {IUser, TUserOptions} from "../../shared/types.ts";
import { useState} from "react";
import {useUser} from "../../shared/store/zustand/store-user.ts";
import {nanoid} from "nanoid";
import {RiAccountBoxLine, RiLockPasswordLine} from "react-icons/ri";
import {MdAlternateEmail} from "react-icons/md";


export const UserModal = (
    {isOpen, onClose, userOptions,}: {
        isOpen: boolean,
        onClose: () => void,
        userOptions: TUserOptions
    }) => {

    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const setCurrentUser = useUser((state) => state.setCurrentUser)
    const currentUser: IUser | undefined = useUser((state) => state.currentUser);
    const [name, setName] = useState<string>(currentUser?.username || "")
    const [email, setEmail] = useState<string>(currentUser?.useremail || "")
    const [password, setPassword] = useState<string>("")

    const handlerChange = (e: any) => {
        if (e.target.name === "name_password") {
            console.log("Handler change", e.target.value)
            setPassword(e.target.value)
        } else if (e.target.name === "email") {
            console.log("Handler change", e.target.value)
            setEmail(e.target.value)
        } else if (e.target.name === "name") {
            console.log("Handler change", e.target.value)
            setName(e.target.value)
        }
    }



    const handleClose = () => {
        if (currentUser) {
            setName(currentUser.username )
            setEmail(currentUser.useremail )
            setPassword("")
        }
        console.log("Handler close")
        onClose()
    }

    const handlerSubmit = () => {
        setCurrentUser( {id: nanoid(), username: name, useremail: email})
        onClose()
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
            onOverlayClick={handleClose}
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
                        {userOptions !== "Save" ? userOptions : "Edit"}
                        {" "}
                        {name}
                    </Text>
                </ModalHeader>
                <ModalCloseButton/>
                <FormControl onSubmit={handlerSubmit}>
                    <ModalBody>
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
                                   name={"name"}
                                   required={true}
                                   value={name}
                                   onChange={handlerChange}
                                   placeholder='User name'
                            />
                        </InputGroup>
                        <InputGroup
                            size={{base: "sm", sm: "sm", md: "md", lg: "md", xl: "lg", "2xl": "lg",}}
                            mb={1}
                        >
                            <InputLeftElement pointerEvents='none'>
                                <MdAlternateEmail/>
                            </InputLeftElement>
                            <Input roundedRight={5}
                                   id={nanoid()}
                                   type={"email"}
                                   name={"email"}
                                   required={true}
                                   value={email}
                                   onChange={handlerChange}
                                   placeholder='email@example.com'
                            />
                        </InputGroup>
                        <InputGroup
                            size={{base: "sm", sm: "sm", md: "md", lg: "md", xl: "lg", "2xl": "lg",}}
                            mb={1}
                        >
                            <InputLeftElement pointerEvents='none'>
                                <RiLockPasswordLine />
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
                        </InputGroup>

                    </ModalBody>

                    <ModalFooter as={HStack}
                                 justifyContent={"space-between"}>
                        <Button variant='outline'
                                size={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "lg", "2xl": "lg"}}
                                type={"submit"}
                                colorScheme={"blue"}
                                onClick={handlerSubmit}
                        >
                            {userOptions}
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