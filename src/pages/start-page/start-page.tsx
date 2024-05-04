import {TrailAnimation} from "./trail-animation.tsx";
import {useCommon, useUI} from "../../shared/store/zustand";
import {useEffect, useState} from "react";
import {Flex, useColorModeValue} from "@chakra-ui/react";
import {GET_BG_URL} from "../../shared/store/constants-store";


export function StartPage() {

    const setShowStartPage = useCommon(state => state.setShowStartPage)
    const [open, setOpen] = useState(true);
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const BG = useUI(state => state.linkBG)
    const setLinkBG = useUI(state => state.setLinkBG)

    useEffect(() => {
        if (!open) {
            let timeoutId = setTimeout(() => {
                setShowStartPage(false) // 1 second
            }, 800)
            return () => clearTimeout(timeoutId);
        }
    }, [open]);

    const handleAnyClick = () => {
        setOpen(false);
    };

    useEffect(() => {
        document.addEventListener("keydown", handleAnyClick);
        document.addEventListener("mousedown", handleAnyClick);

        return () => {
            document.removeEventListener("keydown", handleAnyClick);
            document.removeEventListener("mousedown", handleAnyClick);
        };

    }, []);

    useEffect(() => {
        setLinkBG(GET_BG_URL)
    }, []);

    return (
        <Flex background={ isDark ? "linear-gradient(rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0.4))," + "url(" + BG + ")" : "linear-gradient(rgba(240, 240, 240, 0.90), rgba(0, 0, 0, 0))," + "url(" + BG + ")"}
              h={"100vh"}
              w={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              backgroundSize={"cover"}
              backgroundPosition={"center"}

        >
            <div>
                <TrailAnimation open={open}>
                    <span>Hello!</span>
                    <span>Welcome</span>
                    <span>to</span>
                    <span>Bene-Dict</span>
                </TrailAnimation>
            </div>


        </Flex>
    );
}
