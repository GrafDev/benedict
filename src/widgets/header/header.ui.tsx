import React from "react";
import {Box, Button, Icon} from "@mui/material";
import {useTheme} from "next-themes";
import {IconName} from "../../shared/ui/icon";


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
        {handler: toggleTheme, iconName: isDarkTheme ? "common/moon" : "common/sun"},
        {handler: () => console.log("settings"), iconName: "common/settings"},
    ]
    return (
        <div>
      <Button>
          <Icon />
          <span className="hidden md:block">Back</span>
      </Button>
        </div>
    );
}

