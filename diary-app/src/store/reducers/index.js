import entries from "./entries"
import auth from "./auth"
import UI from "./UI"
import {combineReducers} from "redux"
const rootReducer = combineReducers({
    entries,
    auth,
    UI
})
export default rootReducer