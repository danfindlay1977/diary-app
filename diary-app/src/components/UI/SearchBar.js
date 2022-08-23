import {useState} from 'react' // rcfe
import {useLocation , useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {searchEntries} from "../../store/actions/action"
function SearchBar() {
    const token = useSelector(state => state.auth.token) 
    const dispatch = useDispatch()
    const location = useLocation()
    const navigator = useNavigate()
    const [searchState, setSearchState] = useState("")
    const onChangeHandler = (e) => {
        setSearchState(e.target.value) 
    }
    const onSubmitHandler = (e) => {
        console.log(e.target.value)
        e.preventDefault()
        const pathname = location.pathname
        const queryStr = searchState.split(" ").map((param, index) => {
            if(index == 0) {
                return `?search=${param}`
            }
            return `+${param}`
        }).join("")
        console.log(pathname)
        if(pathname !== "/search") {
            navigator(`search${queryStr}`)
        }
        else{
            navigator(pathname + queryStr)
        }
        console.log(queryStr)
        dispatch(searchEntries(queryStr, token))
    }
    return (
        <form onSubmit={onSubmitHandler} >
        <input value={searchState} onChange={onChangeHandler} className="search-bar" type="text" placeholder="search"></input>
        <button>Search</button>
        </form>
    )
}

export default SearchBar
