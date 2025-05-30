import useAuth from "../../../shared/hooks/use-auth.tsx";
import {Flex, Heading, HStack, Image, VStack} from "@chakra-ui/react";
import useOptions from "../../../shared/hooks/use-options.tsx";
import AuthUserEditLine from "./auth-user-edit-line.tsx";
import {timeFormat} from "../../../features/common/timeFormat.ts";
import {useEffect, useState} from "react";
import {DEFAULT_AVATAR, DEFAULT_USER} from "../../../shared/constants";
import {GiExitDoor} from "react-icons/gi";
import {useUserStore} from "../../../shared/store/zustand";
import {signOut} from "firebase/auth";
import {authUser} from "../../../shared/store/firebase/firebase.ts";


const AuthUserInfo = () => {
    const {name, email, userRecord} = useAuth()
    const {gTrans} = useOptions()
    const [_userRecord, _setUserRecord] = useState<number>(userRecord)
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
        console.log(_userRecord)
        saveUserRecordToServer()
        cleanListVocabularies()
        setCurrentUser(DEFAULT_USER)
    }


    useEffect(() => {
        _setUserRecord(userRecord)
    }, [userRecord]);


    return (
        <VStack align={"center"} w={"100%"}>
            <Flex direction={"row"} w={"100%"}  justifyContent={"space-between"}>
                <Heading size={["sm", "sm", "md", "lg"]}
                         color={colorElement}>
                    {`${gTrans("User info")}:`}
                </Heading>
                <Flex display={["block","block", "none"]}
                      justifyContent={"end"}
                      h={"100%"}
                      _hover={{
                          color: colorElement,
                      }}>
                    <GiExitDoor
                        color={colorElement}
                        onClick={onLogout}
                        cursor="pointer"
                        size={20}
                    />
                </Flex>
            </Flex>
            <Flex w={"100%"} gap={[2, 3]} justifyContent={"space-between"} alignItems={"center"}>
                <HStack spacing={[2, 3]} w={"100%"}>
                    <Image
                        display={["none", "block", "block", "block"]}
                        borderRadius={["0", "20px", "50px", "full"]}
                        borderColor={"darkred"}
                        border={"2px solid rgba(255, 255, 255, 0.18)"}
                        boxSize={["60px", "80px", "100px", "120px"]}
                        src={photoUrl ? photoUrl : DEFAULT_AVATAR}
                        alt={`Benedict avatar`}
                    />

                    <Flex gap={[2, 3]} direction={"column"}>

                        <AuthUserEditLine text1={`${gTrans("Name")}:`} text2={name ? name : gTrans("No name")}
                                          editable={true}/>
                        <AuthUserEditLine text1={`${gTrans("Email")}:`} text2={email}/>
                        <AuthUserEditLine text1={`${gTrans("Record")}:`}
                                          text2={_userRecord ? timeFormat(_userRecord) : gTrans("No records")}/>
                    </Flex>
                </HStack>

                <Flex display={["none","none", "block"]}
                      justifyContent={"end"}
                      h={"100%"}
                      _hover={{
                          color: colorElement,
                      }}>

                    <GiExitDoor
                        color={colorElement}
                        onClick={onLogout}
                        cursor="pointer"
                        size={50}
                    />
                </Flex>


            </Flex>
        </VStack>
    )
}
export default AuthUserInfo;