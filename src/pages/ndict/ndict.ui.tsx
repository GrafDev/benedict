import React from "react";
import {Box, Grid, useColorModeValue} from "@chakra-ui/react";
import {Answers} from "../../widgets/answers";
import {Question} from "../../widgets/question";
import {makeBG} from "../../features/makeBG.ts";

// const BGPicture="url('https://parsefiles.back4app.com/IQbWsGjOUYF0zHuJDWJQJM5hsRhao1BemVSiqQCJ/84b5ca647d1de8f339bca7590bb1ce6f_1.jpeg')";

export const NDict: React.FC = () =>{
const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
const BG: string = makeBG(isDark);



return (
    <Box
        background={BG}
         backgroundSize={"cover"}
         backgroundPosition={"center"}
         w={"100%"}
         display={'flex'}
         justifyContent={'center'}

    >
        <Grid gridTemplateRows={{base: "1fr auto",sm: "1fr auto", md: "auto 1fr", lg: "auto 1fr", xl: "auto 1fr", "2xl": "auto 1fr"}}
              h={"100%"}
              gap={2}
              maxW={"720px"}
              w={'100%'}
              justifySelf={'center'}
        >

            <Question/>
            <Answers/>
        </Grid>
    </Box>

);
}