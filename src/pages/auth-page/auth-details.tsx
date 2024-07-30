import React from 'react';
import {Flex} from '@chakra-ui/react';
import {Fade} from "react-awesome-reveal";
import AuthUserInfo from "./components/auth-user-info.tsx";
import AuthVocabularyNameList from "./components/auth-vocabulary-name-list.tsx";
import AuthUserHeading from "./components/auth-user-heading.tsx";
import AuthCard from "./components/auth-card.tsx";
import useOptions from "../../shared/hooks/use-options.tsx";

const AuthDetails: React.FC = () => {
    const {isDark} = useOptions()

    return (
        <Fade style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', padding: 20 }}>
                <Flex
                    direction={"column"}
                    gap={[2, 3, 4, 5]}
                    maxWidth="1024px"
                    w={"100%"}
                    h={"90%"}>
                    <AuthCard>
                        <AuthUserHeading/>
                    </AuthCard>
                    <AuthCard>
                        <AuthUserInfo/>
                    </AuthCard>
                    <Flex
                        style={{ height: 'calc(100vh - 550px)' }}
                        rounded={[0, 4, 10, 15]}
                        p={[2,4,6]}
                        backgroundColor={`${isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'}`}
                        backdropFilter="blur(10px)"
                        boxShadow={isDark ? "0 8px 8px 0 rgba(0, 0, 0, 0.37)" : "0 8px 8px 0 rgba(91, 114, 120, 0.37)"}
                        border="2px solid rgba(255, 255, 255, 0.18)">
                        <AuthVocabularyNameList/>
                    </Flex>
                </Flex>

        </Fade>
    );
};

export default AuthDetails;