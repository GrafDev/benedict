import {useUserStore} from "../store/zustand";


const useAuth = () => {
    const email=useUserStore(state => state.currentUser?.email)
    const token=useUserStore(state => state.currentUser?.token)
    const id=useUserStore(state => state.currentUser?.id)
    const name=useUserStore(state => state.currentUser?.username)
    const photoUrl=useUserStore(state => state.currentUser?.photoUrl)
    const options=useUserStore(state => state.currentUser?.options)
    const data=useUserStore(state => state.currentUser?.data)

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