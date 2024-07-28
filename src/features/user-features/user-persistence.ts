import {browserLocalPersistence,browserSessionPersistence, setPersistence} from "firebase/auth";
import {authUser} from "../../shared/store/firebase/firebase.ts";

const userPersistence = (rememberMe: boolean) => {
    if (rememberMe) {
        setPersistence(authUser, browserLocalPersistence)
            .then(() => {
                console.log("setPersistence browserLocalPersistence", rememberMe)
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("errorsPersicence", errorCode, errorMessage);
            });
    } else {
        setPersistence(authUser, browserSessionPersistence)
            .then(() => {
                console.log("setPersistence browserSessionPersistence", rememberMe)
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("errorsPersicence", errorCode, errorMessage);
            });
    }

}

export default userPersistence