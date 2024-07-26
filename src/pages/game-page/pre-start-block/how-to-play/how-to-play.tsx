import {
    Box,
    Button,
    Card,
    Image,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import {HELP_ANIME} from "../../../../shared/store/constants-store";
import useAuth from "../../../../shared/hooks/use-auth.tsx";
import useUI from "../../../../shared/hooks/use-ui.tsx";


const HowToPlay: React.FC = () => {
  const {language,colorUI, translations} = useUI()
    const {isOpen, onClose, onToggle} = useDisclosure()
    const{isAuth}=useAuth()


    const helpInfo = (
        <Image
            boxSize={"80%"}
            onClick={() => onClose()}
            cursor={"pointer"}
            margin={"auto"}
            src={HELP_ANIME}
            alt="Not internet connection..."/>
    )

    return (
        <Card
            fontSize={{base: "small", sm: "small", md: "md", lg: "md", xl: "lg", "2xl": "lg"}}
            w={"90%"}
            h={"100%"}
            background={isOpen ? "transparent" : ""}
            maxW={"1024px"}
            p={4}
            mt={"2rem"}
            mb={"2rem"}
            boxShadow={isOpen ? "none" : "0 0 10px rgba(0, 0, 0, 0.2)"}>
            <Box>

                {!isOpen && <Text mb={4}>
                    {translations[language].welcome1}
                  <br/>
                    {translations[language].welcome2}

                </Text>}
                {!isAuth && !isOpen && <Text mb={4}>
                  <em>
                      {translations[language].registerPlease}
                  </em>
                </Text>}
                <Text textAlign={"center"}
                      mb={4}
                >
                    <Button textDecoration="underline"
                            onClick={() => onToggle()}>{translations[language].help}</Button>
                </Text>

                {isOpen && <Card
                  p={4}
                  h={"auto"}
                  colorScheme={colorUI}
                  rounded={{base: "md", sm: "md", md: "lg", lg: "lg", xl: "xl", "2xl": "2xl"}}
                >
                    {helpInfo}
                </Card>}
            </Box>
        </Card>
    )
}
export default HowToPlay