import { Box } from "@chakra-ui/react";
import { GiExitDoor } from "react-icons/gi";
import useUI from "../../../shared/hooks/use-ui.tsx";

interface ButtonExitProps {
    onLogout: () => void;
}

const ButtonExit = ({ onLogout }: ButtonExitProps) => {
    const { colorElement } = useUI();

    return (
        <Box
            className="button_box"
            position="absolute"
            top={[4, 8, 12, 16]}
            right={[4, 8, 12, 16]}
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
