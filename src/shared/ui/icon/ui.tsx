import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';



const darkIcon: JSX.Element = <DarkModeIcon />;
const lightIcon: JSX.Element = <LightModeIcon />;


export type IconName = 'darkIcon' | 'lightIcon';

interface Props {
    iconName: IconName;
}

export const Icon = ({iconName}: Props): JSX.Element | null => {
    switch (iconName) {
        case 'darkIcon':
            return darkIcon;
        case 'lightIcon':
            return lightIcon;
        default:
            return null;
    }
};


