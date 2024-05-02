import {create} from "zustand";
import {IUser, IUserStore} from "../../types.ts";
import {defaultUser} from "../constants-store/default-user.ts";
import axios from "axios";
import {nanoid} from "nanoid";
import {APPLICATION_ID, getCookie, HOST_URL, REST_API_KEY} from "../../parse";
import {setCookie} from "../../parse";

export const useUser = create<IUserStore>((set, get) => ({

    currentUser: defaultUser,
    currentUserId: nanoid(),
    setCurrentUser: (_currentUser: IUser) => set({currentUser: _currentUser}),
    signUpUser: async (username: string, password: string) => {
        try {
            const response = await axios.post(
                `${HOST_URL}/users/`,
                {username, password},
                {
                    headers: {
                        'X-Parse-Application-Id': APPLICATION_ID,
                        'X-Parse-REST-API-Key': REST_API_KEY,
                        'X-Parse-Revocable-Session': 1,
                        'Content-Type': 'application/json',
                    },
                }
            )
            set({currentUserId: response.data.objectId})
            get().logInUser(username, password)
        } catch (error: any) {
            console.log(error)
        }

        console.log('SignUp', get().currentUserId)
    },
    readingUser: async () => {
        try {
            const response = await axios.get(`${HOST_URL}/users/${get().currentUserId}`, {
                headers: {
                    'X-Parse-Application-Id': APPLICATION_ID,
                    'X-Parse-REST-API-Key': REST_API_KEY,
                },
            })
            set({currentUser: response.data})
            console.log(response.data)
        } catch (error: any) {
            console.log(error)
        }
    },
   logInUser: async (username: string, password: string) => {
       try {
           const response = await axios.post(`${HOST_URL}/login`, {username, password}, {
               headers: {
                   'X-Parse-Application-Id': APPLICATION_ID,
                   'X-Parse-REST-API-Key': REST_API_KEY,
                   'X-Parse-Revocable-Session': 1,
               },
           })
           set({currentUser: response.data})
            setCookie('BenedictUserToken', response.data.sessionToken, new Date(response.data.expirationTime))
           console.log("token----",response.data.sessionToken)
       } catch (error: any) {
           console.log(error)
       }
   } ,
    logOutUser: async () => {
        try {
            // функция получения токена из куков
            const cookie = getCookie('BenedictUserToken')
            console.log(cookie)
            const response = await axios.post(`${HOST_URL}/logout}`, {
                headers: {
                    'X-Parse-Application-Id': APPLICATION_ID,
                    'X-Parse-REST-API-Key': REST_API_KEY,
                    "X-Parse-Session-Token": cookie,
                },
            })
            set({currentUser: defaultUser})
            console.log(response.data)
        } catch (error: any) {
            console.log(error)
        }
    }

}))