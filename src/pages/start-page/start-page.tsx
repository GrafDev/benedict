import {TrailAnimation} from "./trail-animation.tsx";
import {useCommon, useUI} from "../../shared/store/zustand";
import {useEffect, useState} from "react";
import {Flex, useColorModeValue} from "@chakra-ui/react";
import { makeBG} from "../../features/common";
import {GET_BG_URL} from "../../shared/store/constants-store";


export function StartPage() {

    const setShowStartPage = useCommon(state => state.setShowStartPage)
    const [open, setOpen] = useState(true);
    const isDark: boolean = useColorModeValue('light', 'dark') === 'dark';
    const toggleBG = useUI(state => state.toggleBG)
const BG = useUI(state => state.linkBG)
const setLinkBG = useUI(state => state.setLinkBG)
    useEffect(() => {
        if (!open) {
            let timeoutId = setTimeout(() => {
                setShowStartPage(false) // 1 second
                toggleBG(false)
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
        toggleBG(true)


    }, []);

    return (
        <Flex h={"100vh"}
              w={"100vw"}
              justifyContent={"center"}
              alignItems={"center"}
              background={makeBG(isDark, BG)}
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
