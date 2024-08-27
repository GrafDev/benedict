import {Fade} from "react-awesome-reveal";
import {Heading, Text} from "@chakra-ui/react";
import useOptions from "@/shared/hooks/use-options.tsx";


const HeadingFade = (props: any) => {
    const {isDark,colorElement, colorUI} = useOptions()
    return (
        <Fade>
            <Heading color={isDark && colorUI === 'gray' ? `${colorUI}.300` : colorElement}>
                {props.text1}
            </Heading>
            {!props.error
                ?<Text fontSize={["xs", "sm"]}>
                {props.text2}
            </Text>
                :<Text color={"red"} fontSize={["xs", "sm"]}>
                    {props.error}
                </Text>}

        </Fade>
    )
}
export default HeadingFade;
