import {useDictModal} from "../../shared/store/zustand/store-modal.ts";
import {Text} from "@chakra-ui/react";
import {getTooltipTranslate} from "../../features/toGame";
export const FormDict = ()=>{
        const editWord=useDictModal((state)=>state.editWord)

return (
    <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            {editWord.word + " - " + getTooltipTranslate(editWord)}

    </Text>
)}
