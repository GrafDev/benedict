import {Button, HStack, ModalFooter, Text} from "@chakra-ui/react";
import {buttonStyles} from "../../shared/ui/button-style.ts";
import {useUser} from "../../shared/store/zustand";

interface IModalButtonYesOrNoProps {
    buttonOK: string
    buttonCancel: string
    handleConfirm: () => void
    handleClose: () => void
}

const ModalButtonYesOrNo = ({buttonOK, buttonCancel, handleConfirm, handleClose}: IModalButtonYesOrNoProps) => {
    const colorUI = useUser(store => store.currentUser.colorUI)

    return(
        <ModalFooter as={HStack}
                     justifyContent={"space-around"}>
            <Button variant={"outline"}
                    {...buttonStyles(colorUI)}
                    w={"fit-content"}
                    maxW={"auto"}
                    minW={"90px"}
                    fontWeight={"bold"}
                    border={`2px solid`}
                    borderColor={colorUI}
                    onClick={handleConfirm}>
                <Text> {buttonOK} </Text>
            </Button>
            <Button variant={"outline"}
                    {...buttonStyles(colorUI)}
                    w={"fit-content"}
                    maxW={"auto"}
                    minW={"90px"}
                    border={` 1px solid`}
                    borderColor={colorUI}
                    onClick={handleClose}>
                <Text> {buttonCancel} </Text>
            </Button>
        </ModalFooter>
    )
}
export default ModalButtonYesOrNo