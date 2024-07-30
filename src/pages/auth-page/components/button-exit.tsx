import { Box } from "@chakra-ui/react";
import { GiExitDoor } from "react-icons/gi";
import useOptions from "../../../shared/hooks/use-options.tsx";

interface ButtonExitProps {
    onLogout: () => void;
}

const ButtonExit = ({ onLogout }: ButtonExitProps) => {
    const { colorElement } = useOptions();

    return (
        <Box
            width="fit-content"
        >
            <GiExitDoor
                color={colorElement}
                onClick={onLogout}
                cursor="pointer"
                size="50"
            />
        </Box>
    );
};

export default ButtonExit;
