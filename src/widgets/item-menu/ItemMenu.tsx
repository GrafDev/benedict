import {IconButton, Menu, MenuButton, MenuItem, MenuList, Tooltip} from "@chakra-ui/react";
import {TiHomeOutline} from "react-icons/ti";
import {FaQuestion} from "react-icons/fa";
import {RiAccountBoxLine} from "react-icons/ri";
import {IoLibraryOutline} from "react-icons/io5";
import React, {useCallback} from "react";
import {useCommon, useUser} from "../../shared/store/zustand";
import {useNavigate} from "react-router";
import Hamburger from 'hamburger-react'
import {AUTH_LINK, DICTIONARY_LINK, GAME_LINK, HOME_LINK} from "../../shared/constants-ui.ts";


export const ItemMenu: React.FC = () => {
    const navigate = useNavigate()
    const isStart = useCommon(state => state.isStart)
    const [isOpen, setIsOpen] = React.useState(false);
const colorUI=useUser(store=>store.currentUser.colorUI)
    const handleMenuItemClick = useCallback((command: string) => {
        switch (command) {
            case "Home page":
                navigate(HOME_LINK)
                break;
            case "Dictionary":
                navigate(DICTIONARY_LINK)
                break;
            case"Game":
                navigate(GAME_LINK)
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
            <Tooltip label="Menu"
                     aria-label='A tooltip'
                     colorScheme={colorUI}
                     openDelay={500}
                     closeDelay={200}>

                <MenuButton as={IconButton}
                            isDisabled={isStart}
                            icon={<Hamburger toggled={isOpen} size={24}/>}
                            variant='outline'
                            border={"none"}
                            colorScheme={colorUI}
                            _hover={{
                                cursor: isStart ? "not-allowed" : "pointer"
                            }}
                            _active={{
                                cursor: isStart ? "not-allowed" : "pointer"
                            }}
                />
            </Tooltip>

            <MenuList
                fontSize={{base: "md", sm: "md", md: "md", lg: "md", xl: "large", "2xl": "large"}}
                zIndex={2}
            >
                <MenuItem icon={<TiHomeOutline/>} onClick={() => handleMenuItemClick("Home page")}>
                    Home page
                </MenuItem>
                <MenuItem icon={<IoLibraryOutline/>} onClick={() => handleMenuItemClick("Game")}>
                    Learn
                </MenuItem>
                <MenuItem icon={<IoLibraryOutline/>} onClick={() => handleMenuItemClick("Dictionary")}>
                    Dictionary
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
