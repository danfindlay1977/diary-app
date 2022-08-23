import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
const HeaderButtons = (props) => {
     const name = useSelector(state => state.auth.name)
    const navigate = useNavigate()
    return (
        <section className="header-buttons">
            {!props.isLoggedIn && <button onClick={() => navigate("/signup")} className="btn">Sign Up</button>}
            {props.isLoggedIn && <p>{name}</p>}
          <button onClick={props.authHandler} className="btn">{props.isLoggedIn ? "Logout" : "Login"}</button>
          </section>
        
    )
}
export default HeaderButtons