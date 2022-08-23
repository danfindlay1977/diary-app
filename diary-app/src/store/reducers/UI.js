const initialState = {
    nav: false,
    searchText: "",
    searchItems: []

}

const UIReducer = (state = initialState, action) => {
    switch(action.type) {
        case "TOGGLE_NAV":
            return {...state, nav: !state.nav}
        case "SET_SEARCH_TEXT":
            return {...state, searchText: action.payload}
        case "SET_SEARCH_ITEMS":
            return {...state, searchItems: action.payload}
        default:
            return state
    }
}
export default UIReducer