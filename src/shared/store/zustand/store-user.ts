import {create} from "zustand";
import {IUser, IUserStore} from "../../types.ts";
import {defaultUser} from "../constants-store/default-user.ts";
import axios from "axios";

export const useUser = create<IUserStore>((set) => ({

    currentUser: defaultUser,

    setCurrentUser: (_currentUser: IUser) => set({currentUser: _currentUser}),
    // signUpUser: async (username: string, password: string): Promise<any> {
    //     try {
    //          await axios.post(
    //             `${HOST_URL}/users`,
    //             {username, password},
    //             {
    //                 headers: {
    //                     'X-Parse-Application-Id': APPLICATION_ID,
    //                     'X-Parse-Javascript-Key': JAVASCRIPT_KEY,
    //                     'X-Parse-Revocable-Session': 1,
    //                     'Content-Type': 'application / json',
    //                 },
    //             }
    //         ).then((response) => {
    //             set({currentUser: response.data})
    //         });
    //     }
    // }
}))