import React from "react";
import {ThemeProvider} from "@emotion/react";
import {Grid} from "@mui/material";

import theme from "./theme.tsx";
import {Header} from "../../widgets/header";
import {MainPage} from "../../widgets/ndict";
import {Footer} from "../../widgets/footer";


const Provider: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Grid container direction="column"
                  alignItems="stretch"
                  spacing={0}
                  sx={{height: "100vh",}}
            >
                <Grid item xs={0.5}>
                    <Header/>
                </Grid>
                <Grid item xs={11}>
                    <MainPage/>
                </Grid>
                <Grid item xs={0.5}>
                    <Footer/>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Provider;