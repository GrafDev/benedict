import {useUserStore} from "../store/zustand";


const useUser = () => {
    const currentUser = useUserStore(state => state.currentUser)


    return {
        currentUser,
    }
}
export default useUser