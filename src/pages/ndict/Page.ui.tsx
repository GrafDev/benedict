import React from "react";
import {Grid} from "@chakra-ui/react";
import {NDict} from "../../widgets/answers";
import {Question} from "../../widgets/question";



export const Page: React.FC = () => {

    return (
       <Grid gridTemplateRows={'auto 1fr'}>
           <Question/>
           <NDict/>
       </Grid>
    );
}