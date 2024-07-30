import useOptions from "../../../shared/hooks/use-options.tsx";
import {Editable, EditableInput, EditablePreview, Flex, Heading, Text} from "@chakra-ui/react";
import {useUserStore} from "../../../shared/store/zustand";


interface IAuthUserInfoProps {
    text1: string | null | number | undefined;
    text2: string | null | number | undefined;
    editable?: boolean;
}


const AuthUserEditLine = ({text1, text2, editable}: IAuthUserInfoProps) => {

    const {colorElement} = useOptions()
    const currentUser = useUserStore(state => state.currentUser)
    const updateCurrentUserToServer = useUserStore(state => state.updateCurrentUserToServer)

    const handleEditName = (newName:string) =>{
        const _user = {...currentUser, username: newName}
        updateCurrentUserToServer(_user)
    }


    return (
        <Flex gap={[2, 3, 4, 5]} direction={"row"} alignItems={"center"}>
            <Heading size={"md"} color={colorElement}
                     w={["100px", "100px", "150px", "200px"]}>
                {text1 ? text1 : ''}
            </Heading>

            {editable
                ? <Editable
                    onSubmit={handleEditName}
                    defaultValue={String(text2 ? text2 : '')}>
                    <EditablePreview/>
                    <EditableInput />
                </Editable>
                : <Text fontSize={"md"}> {text2 ? text2 : ''}</Text>}
            {/*{editable && <IconButton variant={"ghost"}*/}
            {/*                         _hover={{*/}
            {/*                             color: colorElement,*/}
            {/*                             transform: 'scale(1.1)'*/}
            {/*                         }}*/}
            {/*                         onClick={handleEditName}*/}
            {/*                         aria-label={"Edit"} icon={<EditIcon/>}/>}*/}
        </Flex>
    )
}
export default AuthUserEditLine