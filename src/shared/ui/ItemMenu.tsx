import {IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import { TiThMenu } from "react-icons/ti";
import {PiSelectionBackground} from "react-icons/pi";
import { FaQuestion } from "react-icons/fa";
import { RiAccountBoxLine } from "react-icons/ri";
import { IoLibraryOutline } from "react-icons/io5";
import React, {useCallback} from "react";
import {useCommon} from "../store/zustand/store.ts";



export const ItemMenu: React.FC = () => {
    const toggleBG:any = useCommon(state => state.toggleBG);
    const isBG= useCommon(state => state.isBG);

    const handleMenuItemClick = useCallback((command: string) => {
        console.log(`Вы выбрали команду: ${command}`);
        switch (command) {
            case "Dictionary":
                break;
            case "Background":
                toggleBG();
                break;
            case "Account":
                break;
            case "Help":
                break;
            default:
                break;
        }
    }, []);


    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<TiThMenu/>}
                variant='outline'
                border={"none"}
            />
            <MenuList>
                <MenuItem icon={<IoLibraryOutline />} onClick={() => handleMenuItemClick("Dictionary")}>
                    Dictionary
                </MenuItem>
                <MenuItem icon={<PiSelectionBackground/>}
                          onClick={() => handleMenuItemClick("Background")}>
                    {isBG ? "Background off" : "Background on"}
                </MenuItem>
                <MenuItem icon={<RiAccountBoxLine/>} onClick={() => handleMenuItemClick("Account")}>
                    Account
                </MenuItem>
                <MenuItem icon={<FaQuestion/>}  onClick={() => handleMenuItemClick("Help")}>
                    Help
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
