import {useUser} from "../../shared/store/zustand";
import {Box, Button, Flex} from "@chakra-ui/react";
import {TColorUI} from "../../shared/types.ts";
import {useState} from "react";

export const ChangeColor = () => {
    const colorUI: TColorUI = useUser(store => store.currentUser.colorUI)

const [color, setColor] = useState<TColorUI>(colorUI)
    const colors=['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'gray', 'alphas', 'cyan', 'teal' ]
    const changeColor = (color: TColorUI) => {
        setColor(color)
    }
    return (
        <Box
            p={2}
        >
            Change color theme
            <Flex display={"flex"}
                  justifyContent={"center"}
                  flexWrap={"wrap"}
                  gap={1}
            >
                {colors.map((key) => (
                    <Box
                        key={key}
                        as={Button}
                        colorScheme={key}
                        onClick={() => changeColor(key)}
                    >
                    </Box>
                ))}

            </Flex>
        </Box>
    )
}