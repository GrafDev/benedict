import { IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {TiHomeOutline} from "react-icons/ti";
import {PiSelectionBackground} from "react-icons/pi";
import {FaQuestion} from "react-icons/fa";
import {RiAccountBoxLine} from "react-icons/ri";
import {IoLibraryOutline} from "react-icons/io5";
import React, {useCallback} from "react";
import {useCommon, useUI} from "../../shared/store/zustand";
import {useNavigate} from "react-router";
import Hamburger from 'hamburger-react'
import {AUTH_LINK, DICTIONARY_LINK, HOME_LINK} from "../../shared/constants-ui.ts";


export const ItemMenu: React.FC = () => {
    const toggleBG: any = useUI(state => state.toggleBG);
    const isBG = useUI(state => state.isBG);
    const navigate = useNavigate()
    const isStart = useCommon(state => state.isStart)
    const [isOpen, setIsOpen] = React.useState(false);

    const handleMenuItemClick = useCallback((command: string) => {
        console.log(`Вы выбрали команду: ${command}`);
        switch (command) {
            case "Home page":
                navigate(HOME_LINK)
                break;
            case "Dictionary":
                navigate(DICTIONARY_LINK)
                break;
            case "Background":
                toggleBG();
                break;
            case "Account":
                navigate(AUTH_LINK)
                break;
            case "Help":
                break;
            default:
                break;
        }
    }, []);


    return (
        <Menu onClose={() => setIsOpen(false)}
              onOpen={() => setIsOpen(true)}
        >

            <MenuButton as={IconButton}
                        isDisabled={isStart}
                        icon={<Hamburger toggled={isOpen} size={24} />}
                        variant='outline'
                        border={"none"}
                        _hover={{
                            cursor: isStart ? "not-allowed" : "pointer"
                        }}
                        _active={{
                            cursor: isStart ? "not-allowed" : "pointer"
                        }}
            />

            <MenuList
                fontSize={{base: "md", sm: "md", md: "md", lg: "md", xl: "large", "2xl": "large"}}
            >
                <MenuItem icon={<TiHomeOutline />} onClick={() => handleMenuItemClick("Home page")}>
                    Home page
                </MenuItem>
                <MenuItem icon={<IoLibraryOutline/>} onClick={() => handleMenuItemClick("Dictionary")}>
                    Dictionary
                </MenuItem>
                <MenuItem icon={<PiSelectionBackground/>}
                          onClick={() => handleMenuItemClick("Background")}>
                    {isBG ? "Background off" : "Background on"}
                </MenuItem>
                <MenuItem icon={<RiAccountBoxLine/>} onClick={() => handleMenuItemClick("Account")}>
                    Account
                </MenuItem>
                <MenuItem icon={<FaQuestion/>} onClick={() => handleMenuItemClick("Help")}>
                    Help
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
