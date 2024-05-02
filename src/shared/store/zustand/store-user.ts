import {create} from "zustand";
import {IUser, IUserStore} from "../../types.ts";
import {defaultUser} from "../constants-store/default-user.ts";
import axios from "axios";
import {nanoid} from "nanoid";

export const useUser = create<IUserStore>((set,get) => ({

    currentUser: defaultUser,
    currentUserId: nanoid(),
    setCurrentUser: (_currentUser: IUser) => set({currentUser: _currentUser}),
    signUpUser: async (username: string, password: string) => {
        try {
            const response = await axios.post(
                `https://parseapi.back4app.com/users/`,
                {username, password},
                {
                    headers: {
                        'X-Parse-Application-Id': 'IQbWsGjOUYF0zHuJDWJQJM5hsRhao1BemVSiqQCJ',
                        'X-Parse-Javascript-Key': JAVASCRIPT_KEY,
                        'X-Parse-Revocable-Session': 1,
                        'Content-Type': 'application/json',
                    },
                }
            )
            set({currentUserId: response.data.objectId})
        } catch (error: any) {
            console.log(error)
        }
        console.log('SignUp',get().currentUserId)
    }

}))