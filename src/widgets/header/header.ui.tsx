import React from "react";
import {Box} from "@mui/material";


export const Header: React.FC = () => {
    return (
        <div>
            <Box
                sx={{
                    width: 100,
                    height: "100%",
                    borderRadius: 1,
                    bgcolor: 'primary.main',
                    '&:hover': {
                        bgcolor: 'primary.dark',
                    },
                }}
            >
                <h1>My App</h1>
            </Box>
        </div>
    );
}

