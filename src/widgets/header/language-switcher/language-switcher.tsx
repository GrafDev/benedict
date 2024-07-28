import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import {useCommonStore, useOptionsStore} from "../../../shared/store/zustand";
import UkraineMColorIcon from "@alfalab/icons-flag/UkraineMColorIcon";
import RussiaMColorIcon from "@alfalab/icons-flag/RussiaMColorIcon";
import FranceMColorIcon from "@alfalab/icons-flag/FranceMColorIcon";
import ItalyMColorIcon from "@alfalab/icons-flag/ItalyMColorIcon";
import GermanyMColorIcon from "@alfalab/icons-flag/GermanyMColorIcon";
import SpainMColorIcon from "@alfalab/icons-flag/SpainMColorIcon";
import SerbiaMColorIcon from "@alfalab/icons-flag/SerbiaMColorIcon";
import UnitedKingdomMColorIcon from "@alfalab/icons-flag/UnitedKingdomMColorIcon";
import {TLanguage} from "../../../shared/types/ui-types.ts";
import useUI from "../../../shared/hooks/use-ui.tsx";

export const LanguageSwitcher = () => {
    const setLanguage = useOptionsStore(state => state.setLanguage)
    const isStart = useCommonStore(state => state.isStart)
    const {language, colorUI} = useUI()
    const handleLanguageChange = (_language: TLanguage) => {
        setLanguage(_language);
    };

    const getFlagOFLang = (_language: TLanguage) => {
        switch (_language) {
            case 'en':
                return <UnitedKingdomMColorIcon/>
            case 'fr':
                return <FranceMColorIcon/>
            case 'es':
                return <SpainMColorIcon/>
            case 'de':
                return <GermanyMColorIcon/>
            case 'it':
                return <ItalyMColorIcon/>
            case 'ru':
                return <RussiaMColorIcon/>
            case 'ua':
                return <UkraineMColorIcon/>
            case 'rs':
                return <SerbiaMColorIcon/>
        }
    }
    const flagMenu = (_language: TLanguage, fullNameOfLang: string): Element | any => {
        return(
        <MenuItem icon={getFlagOFLang(_language)}
                  onClick={() => handleLanguageChange(_language)}>
            {fullNameOfLang}
        </MenuItem>)
    }

    return (
        <Menu>
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
                {getFlagOFLang(language)}
            </MenuButton>
            <MenuList width={50}>
                {flagMenu('en', " English")}
                {flagMenu('ua', " Українська")}
                {flagMenu('fr', " Français")}
                {flagMenu('es', " Español")}
                {flagMenu('de', " Deutsch")}
                {flagMenu('it', " Italiano")}
                {flagMenu('rs', " Srpski")}
                {flagMenu('ru', " Русский")}
            </MenuList>
        </Menu>
    );
}
