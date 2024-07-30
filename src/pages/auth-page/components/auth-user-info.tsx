import useAuth from "../../../shared/hooks/use-auth.tsx";
import {Flex,Heading} from "@chakra-ui/react";
import useOptions from "../../../shared/hooks/use-options.tsx";
import AuthUserEditLine from "./auth-user-edit-line.tsx";
import {timeFormat} from "../../../features/common/timeFormat.ts";
import {useEffect, useState} from "react";



const AuthUserInfo = () => {
    const {colorElement} = useOptions()
    const {name, email, userRecord} = useAuth()
    const {gTrans} = useOptions()
    const [_userRecord, _setUserRecord] = useState<number>(userRecord)
    console.log(_userRecord,"userRecord")

    useEffect(() => {
        _setUserRecord(userRecord)
    }, [userRecord]);
    return (
        <Flex gap={[2, 3]} direction={"column"}>
            <Heading size={["sm", "sm", "md", "lg"]}
                     color={colorElement}>
                {`${gTrans("User info")}:`}
            </Heading>
            <AuthUserEditLine text1={`${gTrans("Name")}:`} text2={name?name:gTrans("No name")} editable={true}/>
            <AuthUserEditLine text1={`${gTrans("Email")}:`} text2={email}/>
            <AuthUserEditLine text1={`${gTrans("Record")}:`} text2={_userRecord?timeFormat(_userRecord):gTrans("No records")}/>
        </Flex>
    )
}
export default AuthUserInfo;