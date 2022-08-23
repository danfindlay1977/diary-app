 const remainingTime = (expiresIn) => {
    const currentTime = new Date().getTime() 
    const ajExpireTime = new Date(expiresIn).getTime()
    return ajExpireTime - currentTime
 }
 export const login = (expiresIn, data) => (dispatch) => {
    const {token} = data
    dispatch({type: "LOGIN", payload: data})
    const timeLeft = remainingTime(expiresIn)
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expiresIn);
    // set auto logout
    setTimeout(() => {
        console.log("auto logged out user")
        dispatch({type: "LOGOUT"})
    }, timeLeft)
}
export const logout = () => (dispatch) => {

}

