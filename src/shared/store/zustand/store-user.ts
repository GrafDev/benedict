import {create} from "zustand";
import {IUser, IUserStore} from "../../types.ts";
import {defaultUser} from "../constants-store/default-user.ts";

export const useUser = create<IUserStore>((set) => ({

    currentUser:defaultUser,
    setCurrentUser: (_currentUser: IUser) => set({currentUser:_currentUser}),
}))