import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import UkraineMColorIcon from "@alfalab/icons-flag/UkraineMColorIcon";
import RussiaMColorIcon from "@alfalab/icons-flag/RussiaMColorIcon";
import FranceMColorIcon from "@alfalab/icons-flag/FranceMColorIcon";
import ItalyMColorIcon from "@alfalab/icons-flag/ItalyMColorIcon";
import GermanyMColorIcon from "@alfalab/icons-flag/GermanyMColorIcon";
import SpainMColorIcon from "@alfalab/icons-flag/SpainMColorIcon";
import SerbiaMColorIcon from "@alfalab/icons-flag/SerbiaMColorIcon";
import UnitedKingdomMColorIcon from "@alfalab/icons-flag/UnitedKingdomMColorIcon";
import {useCommon, useUI} from "../../shared/store/zustand";
import {TLanguage} from "../../shared/types/ui-types.ts";

export const LanguageSwitcher = () => {
    const setLanguage = useUI(state => state.setLanguage)
    const language = useUI(state => state.language)
    const isStart = useCommon(state => state.isStart)
    const colorUI = useUI(state => state.colorUI)

    const handleLanguageChange = (newLanguage: TLanguage) => {
        setLanguage(newLanguage);
    };

    const getFlagOFLang = (lang: string) => {
        switch (lang) {
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
    const flagMenu = (_lang: TLanguage,fullNameOfLang:string): Element | any => {
        return <MenuItem icon={getFlagOFLang(_lang)} onClick={() => handleLanguageChange(_lang)}> {fullNameOfLang} </MenuItem>
    }

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
                {getFlagOFLang(language)}
            </MenuButton>
            <MenuList width={50}>
                {flagMenu('en', " English")}
                {flagMenu('ua'," Українська")}
                {flagMenu('fr'," Français")}
                {flagMenu('es'," Español")}
                {flagMenu('de'," Deutsch")}
                {flagMenu('it'," Italiano")}
                {flagMenu('rs'," Srpski")}
                {flagMenu('ru'," Русский")}
            </MenuList>
        </Menu>
    );
}