import {useOptionsStore} from "../../../shared/store/zustand";
import {Box, Button, Grid, GridItem} from "@chakra-ui/react";
import {TColorUI} from "../../../shared/types/ui-types.ts";
import useOptions from "../../../shared/hooks/use-options.tsx";

export const ChangeColor = () => {
    const setColorUI = useOptionsStore(state => state.setColorUI)
    const colors: TColorUI[] = ["gray", "red", "orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink"]
    const {isDark,colorUI}=useOptions()



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