import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import {useCommon, useUser} from "../../shared/store/zustand";

export const LanguageSwitcher = () => {
    const setLanguage = useUser(state => state.setLanguage)
    const language = useUser(state => state.currentUser.language)
    const isStart = useCommon(state => state.isStart)
    const colorUI=useUser(store=>store.currentUser.colorUI)

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
    };


    return (
            <Menu >
                <MenuButton as={Button}
                            isDisabled={isStart}
                            variant='outline'
                            border={"none"}
                            colorScheme={colorUI}
                            _hover={{
                                cursor: isStart ? "not-allowed" : "pointer"
                            }}
                            _active={{
                                cursor: isStart ? "not-allowed" : "pointer"
                            }}>
                    {language}
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
                    <MenuItem onClick={() => handleLanguageChange('fr')}>Français</MenuItem>
                    <MenuItem onClick={() => handleLanguageChange('es')}>Español</MenuItem>
                    <MenuItem onClick={() => handleLanguageChange('de')}>Deutsch</MenuItem>
                    <MenuItem onClick={() => handleLanguageChange('it')}>Italiano</MenuItem>
                    <MenuItem onClick={() => handleLanguageChange('ru')}>Русский </MenuItem>
                    <MenuItem onClick={() => handleLanguageChange('pl')}>Polski</MenuItem>
                    <MenuItem onClick={() => handleLanguageChange('cz')}>Čeština</MenuItem>
                    <MenuItem onClick={() => handleLanguageChange('pt')}>Português</MenuItem>
                    <MenuItem onClick={() => handleLanguageChange('rs')}>Srpski </MenuItem>
                    <MenuItem onClick={() => handleLanguageChange('ua')}>Українська</MenuItem>
                    <MenuItem onClick={() => handleLanguageChange('tr')}>Türkçe</MenuItem>
                </MenuList>

            </Menu>
    );
};