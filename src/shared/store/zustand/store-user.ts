import {create} from "zustand";
import {IUser, IUserStore} from "../../types.ts";
import {defaultUser} from "../constants-store/default-user.ts";
import axios from "axios";
import {APPLICATION_ID, deleteCookie, getCookie, HOST_URL, REST_API_KEY} from "../../parse";
import {setCookie} from "../../parse";

export const useUser = create<IUserStore>((set, get) => ({
    currentUser: defaultUser,
    toggleBG: (_isBG: boolean) => {
        set({
            currentUser: {
                ...get().currentUser,
                isBG: _isBG,
            },
        });
    },
    signUpUser: async (username: string, password: string): Promise<void> => {
        await axios.post(
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
        ).then(response => {
            setCookie("BenedictUserToken", response.data.sessionToken, new Date(response.data.expirationTime));
            console.log("SignUp", response);

            const _currentUser: IUser = {
                id: response.data.objectId,
                username,
                isBG: false
            }
            set({currentUser: _currentUser});
        }).catch((error: any) => {
            console.error("Error signing up user:", error);
        })
    },


    readingUser: async (): Promise<void> => {
        await axios.get(`${HOST_URL}/users/${get().currentUser.id}`, {
            headers: {
                'X-Parse-Application-Id': APPLICATION_ID,
                'X-Parse-REST-API-Key': REST_API_KEY,
            },
        }).then(response => {
            set({currentUser: response.data})
            console.log("reading", response.data)
        }).catch((error: any) => {
            console.log(error)
        })
    },
    retrievingUser: async (): Promise<void> => {
        const token: string | undefined = getCookie('BenedictUserToken')

        await axios.get(`${HOST_URL}/users/me`, {
            headers: {
                "X-Parse-Application-Id": APPLICATION_ID,
                "X-Parse-REST-API-Key": REST_API_KEY,
                "X-Parse-Session-Token": token,
            },
        }).then(response => {
            set({currentUser: response.data})
            console.log("retrieving", response.data)
        }).catch((error: any) => {
            console.log(error)
        })

    },
    logInUser: async (username: string, password: string): Promise<void> => {
        await axios.post(`${HOST_URL}/login`, {username, password}, {
            headers: {
                'X-Parse-Application-Id': APPLICATION_ID,
                'X-Parse-REST-API-Key': REST_API_KEY,
                'X-Parse-Revocable-Session': 1,
            },
        }).then(response => {
            set({currentUser: response.data})
            setCookie('BenedictUserToken', response.data.sessionToken, new Date(response.data.expirationTime))
            console.log("token----", response.data.sessionToken)
        }).catch((error: any) => {
            console.log(error)
        })
    },
    logOutUser: async (): Promise<void> => {
        const token: string | undefined = getCookie('BenedictUserToken')
        console.log(token)
        await axios.post(`${HOST_URL}/logout`, {}, {
            headers: {
                "X-Parse-Application-Id": APPLICATION_ID,
                "X-Parse-REST-API-Key": REST_API_KEY,
                "X-Parse-Session-Token": token,
            },
        }).then(response => {
            set({currentUser: defaultUser})
            deleteCookie('BenedictUserToken')
            console.log(response.data)
        }).catch((error: any) => {
            console.log(error)
        })
    },
    updateUser: async (): Promise<void> => {
        const token: string | undefined = getCookie('BenedictUserToken')
        await axios.put(`${HOST_URL}/users/${get().currentUser.id}`, get().currentUser,{
            headers: {
                "X-Parse-Application-Id": APPLICATION_ID,
                "X-Parse-REST-API-Key": REST_API_KEY,
                "X-Parse-Session-Token": token,
                "Content-Type": "application/json",
            },
        }).then(response => {
            console.log(response.data)
        }).catch((error: any) => {
            console.log(error)
        })
    },
    deleteUser: async (): Promise<void> => {
        const token: string | undefined = getCookie('BenedictUserToken')
        await axios.delete(`${HOST_URL}/users/${get().currentUser.id}`, {
            headers: {
                "X-Parse-Application-Id": APPLICATION_ID,
                "X-Parse-REST-API-Key": REST_API_KEY,
                "X-Parse-Session-Token": token,
            },
        }).then(response => {
            set({currentUser: defaultUser})
            deleteCookie('BenedictUserToken')
            console.log(response.data)
        }).catch((error: any) => {
            console.log(error)
        })
    }

}))