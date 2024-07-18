import { CSSProperties} from "react";
import {ClockLoader} from "react-spinners";
import {Flex, useColorModeValue} from "@chakra-ui/react";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

function Spinner() {
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    return (
        <Flex className="sweet-loading"
              w={"100%"} h={"100%"} justifyContent={"center"} alignItems={"center"}>
            <ClockLoader
                color={!isDark ? "white" : "black"}
                loading={true}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </Flex>
    );
}

export default Spinner;