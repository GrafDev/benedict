import {IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon} from "@chakra-ui/icons";
export const ItemMenu: React.FC = () => {


    return (
        <Menu >
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon/>}
                variant='outline'
            />
            <MenuList >
                <MenuItem icon={<AddIcon/>} command='⌘T' >
                    New Tab
                </MenuItem>
                <MenuItem icon={<RepeatIcon/>} command='⌘⇧N'>
                    Background
                </MenuItem>
                <MenuItem icon={<EditIcon/>} command='⌘O'>
                    Open File...
                </MenuItem>
            </MenuList>
        </Menu>
    );
};
