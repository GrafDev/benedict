import {Box} from "@chakra-ui/react";
import useOptions from "../../../shared/hooks/use-options.tsx";
interface IAuthCardProps {
    children: React.ReactNode;
}
const AuthCard=({children}:IAuthCardProps) => {
const {isDark} = useOptions()
    return (
        <Box
               rounded={[0, 4, 10, 15]}
               p={[2,4,6]}
               backgroundColor={`${isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'}`}
               backdropFilter="blur(10px)"
               boxShadow={isDark ? "0 8px 8px 0 rgba(0, 0, 0, 0.37)" : "0 8px 8px 0 rgba(91, 114, 120, 0.37)"}
               border="2px solid rgba(255, 255, 255, 0.18)">
            {children}
        </Box>
    )
}
export default AuthCard