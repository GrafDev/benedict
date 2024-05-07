import {extendTheme, ThemeConfig} from "@chakra-ui/react";
// import {mode} from "@chakra-ui/theme-tools";






const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};


export const chakraCustomTheme = extendTheme({
    config
});


export function deleteColorModeInLocalStorage() {
    window.localStorage.removeItem("chakra-ui-color-mode");
}

setTimeout(deleteColorModeInLocalStorage, 3000);
