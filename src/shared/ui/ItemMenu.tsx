import {IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {AddIcon, EditIcon, HamburgerIcon} from "@chakra-ui/icons";
import {PiSelectionBackground} from "react-icons/pi";
import {useCallback} from "react";
import {useDict} from "../zustand/store.ts";



export const ItemMenu: React.FC = () => {
    const toggleBG:any = useDict(state => state.toggleBG);

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
            default:
                break;
        }
    }, []);


    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon/>}
                variant='outline'
            />
            <MenuList>
                <MenuItem icon={<AddIcon/>} command='Ctrl + N' onClick={() => handleMenuItemClick("Dictionary")}>
                    Dictionary
                </MenuItem>
                <MenuItem icon={<PiSelectionBackground/>} command='"Ctrl + B"'
                          onClick={() => handleMenuItemClick("Background")}>
                    Background
                </MenuItem>
                <MenuItem icon={<EditIcon/>} command='"Ctrl + O"' onClick={() => handleMenuItemClick("Account")}>
                    Account
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
