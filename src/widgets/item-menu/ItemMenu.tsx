import {IconButton, Menu, MenuButton, MenuItem, MenuList, Tooltip} from "@chakra-ui/react";
import {TiHomeOutline} from "react-icons/ti";
import {RiAccountBoxLine} from "react-icons/ri";
import {IoLibraryOutline} from "react-icons/io5";
import React, {useCallback} from "react";
import {useNavigate} from "react-router";
import Hamburger from 'hamburger-react'
import {FiBookOpen} from "react-icons/fi";
import {AUTH_ROUTE, VOCABULARY_ROUTE, GAME_ROUTE, HOME_ROUTE} from "../../shared/constants";
import {useCommonStore, useUserStore} from "../../shared/store/zustand";
import useOptions from "../../shared/hooks/use-options.tsx";
import useAuth from "../../shared/hooks/use-auth.tsx";


export const ItemMenu: React.FC = () => {
    const navigate = useNavigate()
    const {gTrans,colorUI}=useOptions()
    const {isAuth} = useAuth()
    const isStart = useCommonStore(state => state.isStart)
    const [isOpen, setIsOpen] = React.useState(false);
    const saveVocabulariesToServer=useUserStore(store=>store.saveVocabulariesToServer)
    const handleMenuItemClick = useCallback((command: string) => {
        switch (command) {
            case "Home page":
                saveVocabulariesToServer
                navigate(HOME_ROUTE)
                break;
            case "Dictionary":
                navigate(VOCABULARY_ROUTE)
                break;
            case"Game":
                saveVocabulariesToServer
                navigate(GAME_ROUTE)
                break;
            case "Account":
                saveVocabulariesToServer
                navigate(AUTH_ROUTE)
                break;
            case "Help":
                saveVocabulariesToServer
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
                    {gTrans("Home Page")}
                </MenuItem>
                <MenuItem icon={<FiBookOpen />} onClick={() => handleMenuItemClick("Game")}>
                    {gTrans("Learn")}
                </MenuItem>
                <MenuItem icon={<IoLibraryOutline/>} onClick={() => handleMenuItemClick("Dictionary")}>
                    {gTrans("Vocabulary")}
                </MenuItem>
                <MenuItem icon={<RiAccountBoxLine/>} onClick={() => handleMenuItemClick("Account")}>
                    {isAuth?gTrans("Account"):gTrans("Sign In")}
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
