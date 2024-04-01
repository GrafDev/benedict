import React from "react";
import {useTheme} from "next-themes";
import {Icon, IconName} from "../../shared/ui/icon";
import {Button} from "@mui/material";


interface Action {
    handler: () => void;
    iconName: IconName;
}

export const Header: React.FC = () => {
    const {theme, setTheme} = useTheme()
    const isDarkTheme = theme === "dark"

    const toggleTheme = () => {
        setTheme(isDarkTheme ? "light" : "dark")
    }
    const actions:Action[] = [
        {handler: toggleTheme, iconName: isDarkTheme ? "darkIcon" : "lightIcon"},
    ]
    return (
        <div className="ml-auto flex items-center gap-4">
            {actions.map(({handler, iconName}) => (
                <Button key={iconName} onClick={handler}>
                    <Icon iconName={iconName}/>
                </Button>
            ))}
        </div>
    );
}

