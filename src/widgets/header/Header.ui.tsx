import React from "react";
import {Box, Flex} from "@chakra-ui/react";
import {ColorSwitcher} from "../../shared/ui/Switcher.tsx";
import {ItemMenu} from "../../shared/ui/ItemMenu.tsx";
import {Timer} from "../../shared/ui/Timer.tsx";


export const Header: React.FC = () => {


    return (
        <Box as={"header"} display="flex" justifyContent="center" alignItems="center"
             background={'gray800'}
            >
            <Flex
                  justify={"space-between"}
                  align={"center"}
                  h={"100%"}
                  w={"100%"}
                  wrap={"nowrap"}
                  maxW={"720px"}
            >
                <ItemMenu/>
                <Timer/>
                <ColorSwitcher/>
            </Flex>
        </Box>

    );
}

