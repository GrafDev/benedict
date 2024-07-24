

const useAuth = () => {
    const isAuth = useUser(state => state.isAuth)
    const setIsAuth = useUser(state => state.setIsAuth)
    return {isAuth, setIsAuth}
}