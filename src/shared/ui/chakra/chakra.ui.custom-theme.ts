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
    console.log('deleted "chakra-ui-color-mode" from local storage');
    console.log("You can now refresh to see how a first visit looks like.");
}

setTimeout(deleteColorModeInLocalStorage, 3000);
