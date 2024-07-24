import {extendTheme, ThemeConfig} from "@chakra-ui/react";
// import {mode} from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,

};


export const chakraCustomTheme = extendTheme({
    config,
    fonts: {
        body: "'Open Sans', sans-serif",
        heading: "'Open Sans', sans-serif",
    },
});


export function deleteColorModeInLocalStorage() {
    window.localStorage.removeItem("chakra-ui-color-mode");
}

setTimeout(deleteColorModeInLocalStorage, 3000);
