import {useOptionsStore, useUserStore} from "../store/zustand";
import {onAuthStateChanged} from "firebase/auth";
import {authUser} from "../store/firebase/firebase.ts";
import makeUser from "../../features/user-features/make-user.ts";
import {IUser} from "../types/user-types.ts";

const useStartMounting = () => {
    const readUserOptionsFromLocalStorage = useOptionsStore(state => state.readUserOptionsFromLocalStorage)
    const loadUserRecordFromServer = useUserStore(state => state.loadUserRecordFromServer)
    readUserOptionsFromLocalStorage()

    async function startMountingUser():Promise<IUser> {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(authUser, (userCredential) => {
                if (userCredential) {
                    resolve(makeUser(userCredential));
                    loadUserRecordFromServer()
                }
            }, (error) => {
                reject(error);
            });
        });
    }
    return {
        startMountingUser,
    }
}


export default useStartMounting;
