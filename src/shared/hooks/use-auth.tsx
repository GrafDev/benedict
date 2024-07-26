import {useUser} from "../store/zustand";


const useAuth = () => {
    const email=useUser(state => state.currentUser?.email)
    const token=useUser(state => state.currentUser?.token)
    const id=useUser(state => state.currentUser?.id)
    const name=useUser(state => state.currentUser?.username)
    const photoUrl=useUser(state => state.currentUser?.photoUrl)
    const options=useUser(state => state.currentUser?.options)
    const data=useUser(state => state.currentUser?.data)

    return {
        isAuth: !!email,
        email,
        token,
        id,
        name,
        photoUrl,
        options,
        data
    }
}
export default useAuth