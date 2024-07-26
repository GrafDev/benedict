import React from 'react';
import {Box, Flex, Image, Text, IconButton, Button, useColorModeValue, VStack} from '@chakra-ui/react';
import {FiLogOut} from 'react-icons/fi';
import {useNavigate} from 'react-router-dom';
import {VOCABULARY_LINK} from "../../shared/constants-link.ts";
import useAuth from "../../shared/hooks/use-auth.tsx";
import {DEFAULT_AVATAR} from "../../shared/store/constants-store/constants-pictures.ts";
import {useUI, useUser} from "../../shared/store/zustand";
import {defaultUser} from "../../shared/store/constants-store/default-user.ts";
import colorElement from "../../features/common/color-element.ts";
import {buttonStyles} from "../../shared/ui/button-style.ts";


const UserCard: React.FC = () => {
    const navigate = useNavigate();
    const {photoUrl, name, email,} = useAuth();
    const isDark = useColorModeValue('light', 'dark') === 'dark';
    const setCurrentUser = useUser(state => state.setCurrentUser)
    const colorUI = useUI(state => state.colorUI)


    const handleVocabulariesClick = () => {
        navigate(VOCABULARY_LINK);
    };

    const onLogout = () => {
        setCurrentUser(defaultUser)
    }

    return (
        <Box
            overflow="hidden"

            p={[2, 3, 5, 8]}
            w={["full", "90%"]}
            h={["95%", "100%"]}
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
                      flexDirection={["column", "column", "row"]}
                      justifyContent={"space-between"}
                      p={[2, 5, 5, 10]}
                      rounded={[0, 4, 10, 15]}
                      backgroundColor={isDark ? `gray.500` : `gray.200`}
                      alignItems={"center"}>
                    <Flex flexDirection={["column", "column", "row"]}
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
                            <Text color={colorElement(colorUI)}>
                                {email}
                            </Text>
                        </VStack>
                    </Flex>
                    <IconButton
                        aria-label="Logout"
                        icon={<FiLogOut size={25} color={"#9c1a15"}/>}
                        onClick={onLogout}
                        size={"lg"}
                        variant="ghost"
                    />
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
    );
};

export default UserCard;