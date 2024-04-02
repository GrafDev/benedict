import React from "react";
import {Box, Container, Flex} from "@chakra-ui/react";
import {ColorSwitcher} from "../../shared/ui/switcher.tsx";



export const Header: React.FC = () => {


    return (
        <Box as={"header"} >
            <Container>
                <Flex>
                    <ColorSwitcher/>
                </Flex>
            </Container>
        </Box>
    );
}

