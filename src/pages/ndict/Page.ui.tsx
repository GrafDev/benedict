import React from "react";
import {Grid, useColorModeValue} from "@chakra-ui/react";
import {Answers} from "../../widgets/answers";
import {Question} from "../../widgets/question";

// const BG="url('https://parsefiles.back4app.com/IQbWsGjOUYF0zHuJDWJQJM5hsRhao1BemVSiqQCJ/84b5ca647d1de8f339bca7590bb1ce6f_1.jpeg')";
const BG: string = "";

export const Page: React.FC = () => {
    const text: string = useColorModeValue('light', 'dark');
    return (
        <Grid gridTemplateRows={'auto 1fr'}
              h={"100%"}
              background={text === 'dark' ? "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))," + BG : BG}
              backgroundSize={"cover"}
              backgroundPosition={"center"}

        >
            <Question/>
            <Answers/>
        </Grid>
    );
}