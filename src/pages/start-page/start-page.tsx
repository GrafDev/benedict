import {useCommon} from "../../shared/store/zustand";
import {FC, useEffect, useState} from "react";
import { Flex,} from "@chakra-ui/react";
import {GET_BG_URL} from "../../shared/store/constants-store";
import {getBG} from "../../features/common";
import {useNavigate} from "react-router";
import {Fade} from "react-awesome-reveal";
import Trail from "../../shared/ui/react-spring/trail.tsx";


const StartPage: FC = () => {
    const setShowStartPage = useCommon((state: any) => state.setShowStartPage); // Type any due to external store
    const [open, setOpen] = useState<boolean>(true);
    const [_BG, _setLinkBG] = useState<string>(getBG(GET_BG_URL));
    const navigate = useNavigate()

    useEffect(() => {
        if (!open) {
            const timeoutId = setTimeout(() => {
                setShowStartPage(false);
            }, 800);
            navigate("/")
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
        const timeoutId = setTimeout(() => {
            setOpen(false);
        }, 2500);
        navigate("/")
        return () => clearTimeout(timeoutId);
    }, []);


    return (
        <Fade
            style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100vw",
            }}
        >
            <Flex
                background={`linear-gradient(rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0.4)), url(${_BG})`}
                h="100vh"
                w="100%"
                style={{
                    opacity: open ? 1 : 0,
                    transition: 'opacity 1s ease-out' }}
                justifyContent="center"
                alignItems="center"
                backgroundSize="cover"
                backgroundPosition="center"
            >
                <div >
                    <Trail open={open}>
                        <Fade delay={100} cascade damping={0.05}>Hello!</Fade>
                        <Fade delay={300} cascade damping={0.05}>Welcome</Fade>
                        <Fade delay={500} cascade damping={0.05}>to</Fade>
                        <Fade delay={700} cascade damping={0.05}>Bene-Dict</Fade>
                    </Trail>
                </div>
            </Flex>
        </Fade>
    );
};

export default StartPage;