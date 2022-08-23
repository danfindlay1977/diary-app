const reducer = (state = [], action) => { 
    switch(action.type) {
        case "ADD_ENTRY":
           return  [...state, action.payload]
        case "LOAD_ITEMS":
            return action.payload
        case "DELETE_ENTRY":
            return state.filter(entry => entry._id !== action.payload)
        case "UPDATE_ENTRY":

            const index = state.indexOf(items => items._id == action.payload._id)
            const arr = [...state]
            arr[index] = action.payload
            return arr
        default:
            return state

    }   
}
export default reducer
