import {useUser} from "../../shared/store/zustand";
import {Box, Button, Grid, GridItem, useColorModeValue} from "@chakra-ui/react";
import {TColorUI} from "../../shared/types.ts";

export const ChangeColor = () => {
    const colorUI: TColorUI = useUser(store => store.currentUser.colorUI)
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const setColorUI = useUser((state) => state.setColorUI)
const isAuth: boolean = useUser((state) => state.isAuth);
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
            <Grid templateColumns={{base:"repeat(5,auto)",lg:"repeat(10,auto)"}}
                  justifyContent={"center"}
                  flexWrap={"wrap"}
                  gap={3}
                  mt={3}
                  p={3}
            >

                {colors.map((key: TColorUI) => (
                    <GridItem
                        key={key}
                        as={Button}
                        isDisabled={!isAuth}
                        aspectRatio={"1/1"}
                        rounded={colorUI === key ? "square" : "full"}
                        boxShadow={colorUI === key ? `0px 0px 5px 2px ${key}` : "md"}
                        border={ colorUI === key ? "" : "1px solid white"}
                        _hover={{
                            boxShadow: colorUI === key ? `0px 0px 5px 2px ${key}` : "lg",
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