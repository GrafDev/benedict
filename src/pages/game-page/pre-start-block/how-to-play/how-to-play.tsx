import {
    Box,
    Button,
    Card,
    Image,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import {HELP_ANIME} from "../../../../shared/constants";
import useAuth from "../../../../shared/hooks/use-auth.tsx";
import useOptions from "../../../../shared/hooks/use-options.tsx";


const HowToPlay: React.FC = () => {
  const {colorUI, gTrans} = useOptions()
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
                    {gTrans("Memorize foreign words much faster with Benedict!")}
                  <br/>
                    {gTrans("Tired of boring flashcards and ineffective language learning methods? Benedict is a revolutionary app that uses the N-back gaming technique to make learning words in the most effective and enjoyable way.")}

                </Text>}
                {!isAuth && !isOpen && <Text mb={4}>
                  <em>
                      {gTrans("Please log in or register. Because if you register, you will be able to save your custom vocabulary to the server so that you can later use it for further training.")}
                  </em>
                </Text>}
                <Text textAlign={"center"}
                      mb={4}
                >
                    <Button textDecoration="underline"
                            onClick={() => onToggle()}>{gTrans("How Does Benedict Work?")}</Button>
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