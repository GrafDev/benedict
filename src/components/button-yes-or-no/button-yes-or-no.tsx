import {Button, HStack, Text} from "@chakra-ui/react";
import {buttonStyles} from "../../shared/ui/button-style.ts";
import {useUser} from "../../shared/store/zustand";

interface IModalButtonYesOrNoProps {
    buttonOK: string
    buttonCancel: string
    handleConfirm: () => void
    type?: 'submit' | 'reset' | 'button'
    handleClose: () => void
}

const ButtonYesOrNo = ({buttonOK, buttonCancel, handleConfirm,type, handleClose}: IModalButtonYesOrNoProps) => {
    const colorUI = useUser(store => store.currentUser.colorUI)
const colorElement =`${colorUI}.600`
    return (
        <HStack as={HStack} w={"full"}
                justifyContent={"space-around"}>
            <Button variant={"outline"}
                    {...buttonStyles(colorUI)}
                    w={"fit-content"}
                    maxW={"auto"}
                    minW={"90px"}
                    type={type?type:'button'}
                    fontWeight={"bold"}
                    border={`2px solid`}
                    borderColor={colorElement}
                    onClick={handleConfirm}>
                <Text> {buttonOK} </Text>
            </Button>
            <Button variant={"outline"}
                    {...buttonStyles(colorUI)}
                    w={"fit-content"}
                    maxW={"auto"}
                    minW={"90px"}
                    border={` 1px solid`}
                    borderColor={colorElement}
                    onClick={handleClose}>
                <Text> {buttonCancel} </Text>
            </Button>
        </HStack>
    )
}
export default ButtonYesOrNo