import {getTranslate} from "../../features/toGame/getTranslate.ts";
import {defaultWord} from "../../shared/store/constants/defaulDictionary.ts";

export const DictionariesPage = () => {
    let word=getTranslate(defaultWord)
    return <div>
        {word}
    </div>

}