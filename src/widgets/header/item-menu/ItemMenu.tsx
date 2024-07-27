import {IconButton, Menu, MenuButton, MenuItem, MenuList, Tooltip} from "@chakra-ui/react";
import {TiHomeOutline} from "react-icons/ti";
import {RiAccountBoxLine} from "react-icons/ri";
import {IoLibraryOutline} from "react-icons/io5";
import React, {useCallback} from "react";
import {useCommonStore} from "../../../shared/store/zustand";
import {useNavigate} from "react-router";
import Hamburger from 'hamburger-react'
import {AUTH_ROUTE, VOCABULARY_ROUTE, GAME_ROUTE, HOME_ROUTE} from "../../../shared/constants/constants-router-links.ts";
import {FiBookOpen} from "react-icons/fi";
import useUI from "../../../shared/hooks/use-ui.tsx";


export const ItemMenu: React.FC = () => {
    const navigate = useNavigate()
    const {translations,language,colorUI}=useUI()

    const isStart = useCommonStore(state => state.isStart)
    const [isOpen, setIsOpen] = React.useState(false);
    const handleMenuItemClick = useCallback((command: string) => {
        switch (command) {
            case "Home page":
                navigate(HOME_ROUTE)
                break;
            case "Dictionary":
                navigate(VOCABULARY_ROUTE)
                break;
            case"Game":
                navigate(GAME_ROUTE)
                break;
            case "Account":
                navigate(AUTH_ROUTE)
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
                zIndex={10}
            >
                <MenuItem icon={<TiHomeOutline/>} onClick={() => handleMenuItemClick("Home page")}>
                    {translations[language].homePage}
                </MenuItem>
                <MenuItem icon={<FiBookOpen />} onClick={() => handleMenuItemClick("Game")}>
                    {translations[language].learn}
                </MenuItem>
                <MenuItem icon={<IoLibraryOutline/>} onClick={() => handleMenuItemClick("Dictionary")}>
                    {translations[language].dictionary}
                </MenuItem>
                <MenuItem icon={<RiAccountBoxLine/>} onClick={() => handleMenuItemClick("Account")}>
                    {translations[language].account}
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
