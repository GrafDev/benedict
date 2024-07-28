import {DEFAULT_USER} from "../../shared/constants";
import {User} from "firebase/auth";
import {IUser} from "../../shared/types/user-types.ts";


const makeUser = (userCredential: User | null): IUser => {
    return userCredential
        ? {
            id: userCredential.uid,
            email: userCredential.email,
            username: userCredential.displayName,
            photoUrl: userCredential.photoURL,
            token: userCredential.refreshToken,
            userRecord: 0,
            data: {
                currentVocabularyId: '0',
                userVocabularies: [],
            }
        }
        : DEFAULT_USER
}
export default makeUser