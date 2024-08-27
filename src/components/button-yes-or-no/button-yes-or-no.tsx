import {Button, HStack, Text} from "@chakra-ui/react";
import useOptions from "@/shared/hooks/use-options.tsx";

interface IModalButtonYesOrNoProps {
    buttonOK: string
    buttonCancel: string
    handleConfirm: () => void
    type?: 'submit' | 'reset' | 'button'
    handleClose: () => void
}

const ButtonYesOrNo = ({buttonOK, buttonCancel, handleConfirm,type, handleClose}: IModalButtonYesOrNoProps) => {
const {colorElement,buttonStyle} = useOptions()
    return (
        <HStack as={HStack} w={"full"}
                justifyContent={"space-around"}>
            <Button variant={"outline"}
                    {...buttonStyle}
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
                    {...buttonStyle}
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
