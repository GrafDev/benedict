export const doLogin = async ( emailInput: string, passwordInput: string ):Promise<Parse.User | null> => {
    // Create static copies of the input values
    // to ensure consistency
    const username: string = emailInput;
    const password: string = passwordInput;

    // Check if user informed required fields
    if (username === '' || password === '') {
        alert("Please inform your username and password!");
        return null;
    }

    // Try to login
    try {
        let user: Parse.User = await Parse.User.logIn(username, password);
        if (user === undefined) {
            alert('Something went wrong when trying to login, please try again!');
            return null;
        }
        // Set current user state variable to force useEffect execution
        return user
    } catch (error: any) {
        alert(error);
        return null
    }
};