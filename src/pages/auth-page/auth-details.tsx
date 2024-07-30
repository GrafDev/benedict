import React from 'react';
import {Flex, Grid} from '@chakra-ui/react';
import {Fade} from "react-awesome-reveal";
import AuthUserInfo from "./components/auth-user-info.tsx";
import AuthVocabularyNameList from "./components/auth-vocabulary-name-list.tsx";
import AuthUserHeading from "./components/auth-user-heading.tsx";
import AuthCard from "./components/auth-card.tsx";

const AuthDetails: React.FC = () => {
    // const navigate = useNavigate();

    return (
        <Fade style={{width: '100%', height: '100%'}}>
            <Flex direction="row" justifyContent="center" alignItems="center"
                  h={"full"}
                  w={["full"]}
            >
                <Grid
                    templateColumns={"1fr,1fr,auto"}
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
                    <AuthCard>
                        <AuthVocabularyNameList/>
                    </AuthCard>

                </Grid>
            </Flex>
        </Fade>
    );
};

export default AuthDetails;