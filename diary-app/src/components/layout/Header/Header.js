import {useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import HeaderButtons from "./HeaderButtons"
import Navigation from "./Navigation"
import SearchBar from "../../UI/SearchBar"

const Header = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authHandler = () => {
    if(isLoggedIn){
      dispatch({type: "LOGOUT"})
    }
    navigate("/login")
  }
    return (
      <header className="header ">
          <section className="flex-wrapper header-items">
            <Navigation/>
            {isLoggedIn && <SearchBar/>}
          <HeaderButtons authHandler={authHandler} isLoggedIn={isLoggedIn}/>
          </section>
      </header>
    )
}
export default Header

