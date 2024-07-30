import useOptions from "../../../shared/hooks/use-options.tsx";
import {Flex, Heading, IconButton, Text} from "@chakra-ui/react";
import {EditIcon} from "@chakra-ui/icons";


interface IAuthUserInfoProps {
    text1: string | null | number | undefined;
    text2: string | null | number | undefined;
    editable?: boolean;
}

const AuthUserEditLine = ({text1, text2, editable}: IAuthUserInfoProps) => {
    const {colorElement} = useOptions()
    return (
        <Flex gap={[2, 3, 4, 5]} direction={"row"} alignItems={"center"} >
            <Heading size={"md"} color={colorElement}
                     w={["100px", "100px", "150px", "200px"]}>
                {text1?text1:''}
            </Heading>
            <Text fontSize={"md"}> {text2?text2:''}</Text>
            {editable && <IconButton variant={"ghost"}
                                     _hover={{
                                         color: colorElement,
                                         transform: 'scale(1.1)'
                                     }}
                                     aria-label={"Edit"} icon={<EditIcon/>}/>}
        </Flex>
    )
}
export default AuthUserEditLine