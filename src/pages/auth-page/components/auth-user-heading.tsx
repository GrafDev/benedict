import {Image, Flex, IconButton} from "@chakra-ui/react";
import {DEFAULT_AVATAR, DEFAULT_USER} from "../../../shared/constants";
import useAuth from "../../../shared/hooks/use-auth.tsx";
import {signOut} from "firebase/auth";
import {authUser} from "../../../shared/store/firebase/firebase.ts";
import {useUserStore} from "../../../shared/store/zustand";
import {GiExitDoor} from "react-icons/gi";
import useOptions from "../../../shared/hooks/use-options.tsx";


const AuthUserHeading = () => {
    const {photoUrl} = useAuth()
    const {colorElement,} = useOptions()
    const setCurrentUser = useUserStore(state => state.setCurrentUser)
    const saveUserRecordToServer = useUserStore(state => state.saveUserRecordToServer)
    const cleanListVocabularies = useUserStore(state => state.cleanListVocabularies)

    const onLogout = () => {
        signOut(authUser).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            console.log("signOut error", error)
        });
        saveUserRecordToServer()
        cleanListVocabularies()
        setCurrentUser(DEFAULT_USER)
    }

    return (
        <Flex gap={4} justifyContent={"space-between"} alignItems={"center"}>
            <Image
                borderRadius={["0", "20px", "50px", "full"]}
                borderColor={"darkred"}
                border={"2px solid rgba(255, 255, 255, 0.18)"}
                boxSize="80px"
                src={photoUrl ? photoUrl : DEFAULT_AVATAR}
                alt={`Benedict avatar`}
            />
            <IconButton
                variant='ghost'
                aria-label='See menu'
                icon={<GiExitDoor
                    color={colorElement}
                    onClick={onLogout}
                    cursor="pointer"
                    size="50"
                />}
                _hover={{color: colorElement,
                    transform: 'scale(1.1)'
                }}
            />
        </Flex>

    )
}
export default AuthUserHeading