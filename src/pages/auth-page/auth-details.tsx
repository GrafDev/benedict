import React from 'react';
import { Box, Flex, Image, Text, Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { VOCABULARY_ROUTE, DEFAULT_AVATAR, DEFAULT_USER } from '../../shared/constants';
import useAuth from '../../shared/hooks/use-auth';
import { useUserStore } from '../../shared/store/zustand';
import { buttonStyles } from '../../shared/ui/button-style';
import useUI from '../../shared/hooks/use-ui';
import { GiExitDoor } from 'react-icons/gi';
import Fade from 'react-awesome-reveal';

const AuthDetails: React.FC = () => {
    const navigate = useNavigate();
    const {photoUrl, name, email,} = useAuth();
    const {isDark, colorElement, colorUI} = useUI()
    const setCurrentUser = useUserStore(state => state.setCurrentUser)
    const handleVocabulariesClick = () => {
        navigate(VOCABULARY_ROUTE);
    };

    const onLogout = () => {
        setCurrentUser(DEFAULT_USER)
    }

    return (
        <Fade style={{width: '100%', height: '100%'}}>
            <Flex direction="row" justifyContent="center" h="100%">
                <Box
                    overflow="hidden"
                    p={[2, 3, 5, 8]}
                    w={["full"]}
                    h={["95%"]}
                    rounded={[0, 4, 10, 15]}
                    maxWidth="1024px"
                    backgroundColor={`${isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'}`}
                    backdropFilter="blur(10px)"
                    boxShadow={isDark ? "0 8px 8px 0 rgba(0, 0, 0, 0.37)" : "0 8px 8px 0 rgba(91, 114, 120, 0.37)"}
                    border="2px solid rgba(255, 255, 255, 0.18)"
                >
                    <Flex direction="column"
                          align="center"
                          justifyContent={"space-between"}
                          h={"100%"}>
                        <Flex w={"100%"}
                              flexDirection={["column", "row", "row"]}
                              justifyContent={"space-between"}
                              p={[2, 3, 4, 5]}
                              pt={[4, 5, 6, 8]}
                              rounded={[0, 4, 10, 15]}
                              backgroundColor={isDark ? `gray.500` : `gray.200`}
                              alignItems={"center"}>
                            <Flex flexDirection={["column", "column","row", "row"]}
                                  gap={[2, 5]}
                                  justifyContent={["center", "center", "flex-start"]}
                                  alignItems={["flex-start", "flex-start", "center"]}>

                                <Image
                                    borderRadius={["0", "20px", "50px", "full"]}
                                    boxSize="100px"
                                    src={photoUrl ? photoUrl : DEFAULT_AVATAR}
                                    alt={`${name}'s photo`}
                                />
                                <VStack spacing={[1, 2]} align={["flex-start"]}>
                                    <Text fontWeight="bold" fontSize="xl">
                                        Graf
                                    </Text>
                                    <Text color={colorElement}>
                                        {email}
                                    </Text>
                                </VStack>
                            </Flex>
                            <Flex direction={"row"}
                                  h={"100%"}
                                  w={"100%"}
                                  justifyContent={"end"}
                                  alignItems={"center"}
                            >
                                <Box h="100%"  display="flex" justifyContent={"end"} alignItems={["end","center"]}
                                pr={[2, 3, 4, 5]}>
                                    <GiExitDoor
                                        color={colorElement}
                                        onClick={onLogout}
                                        cursor={"pointer"}
                                        size="60%"
                                    />
                                </Box>
                            </Flex>

                        </Flex>
                        <Flex w={"100%"} flexDirection={"row"} justifyContent={"center"}>

                            <Button
                                {...buttonStyles(colorUI)}
                                onClick={handleVocabulariesClick}
                            >
                                Vocabularies
                            </Button>

                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </Fade>
    );
};

export default AuthDetails;