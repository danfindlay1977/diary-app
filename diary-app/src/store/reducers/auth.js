const initialState = {
    token: "",
    isLoggedIn: false,
    name: ""
}
const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case "LOGIN":
            return {isLoggedIn: true , token: action.payload.token, name: action.payload.name}
        case "LOGOUT":
            return {isLoggedIn: false, token: ""}
        default:
            return state
    }
}
export default authReducer