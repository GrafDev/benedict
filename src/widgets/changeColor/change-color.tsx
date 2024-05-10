import {useUser} from "../../shared/store/zustand";
import {Box, Button, Grid, GridItem, useColorModeValue} from "@chakra-ui/react";
import {TColorUI} from "../../shared/types.ts";

export const ChangeColor = () => {
    const colorUI: TColorUI = useUser(store => store.currentUser.colorUI)
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const setColorUI = useUser((state) => state.setColorUI)

    const colors: TColorUI[] = ["gray", "red", "orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink"]


    const changeColor = (color: TColorUI) => {
        setColorUI(color)
    }
    return (
        <Box
            p={2}
            color={isDark ? "white" : "black"}
            fontSize={{base: 'sm', md: 'md'}}
            textAlign={"center"}

        >
            Your can change <span style={{
            fontWeight: "bold",
        }}>{colorUI} </span> theme color
            <Grid templateColumns={"repeat(5,auto)"}
                  justifyContent={"center"}
                  flexWrap={"wrap"}
                  gap={3}
                  mt={3}
            >

                {colors.map((key: TColorUI) => (
                    <GridItem
                        key={key}
                        as={Button}
                        aspectRatio={"1/1"}
                        rounded={colorUI === key ? "quare" : "full"}
                        boxShadow={"sm"}
                        _hover={{
                            boxShadow: 'lg',
                            border: `2px solid ${isDark ? "white" : "black"}`,
                            transform: 'scale(1.01)',
                        }}

                        colorScheme={key}
                        onClick={() => changeColor(key)}
                    >


                    </GridItem>

                ))}

            </Grid>
        </Box>
    )
}