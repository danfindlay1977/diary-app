import useInput from "../hooks/use-input"
import {useState} from "react"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {login} from "../store/actions/auth-actions"
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const checkNull = val => val.trim() !== ""
    const {
        value: emailValue, 
        hasError: emailError,
        inputValueChangeHandler: emailChangeHandler,
        inputValueBlurHandler: emailBlurHandler,
        isValid: emailIsValid

    } 
    = useInput(checkNull)
    const {
        value: passwordValue, 
        hasError: passwordError,
        inputValueChangeHandler: passwordChangeHandler,
        inputValueBlurHandler: passwordBlurHandler,
        isValid: passwordIsValid
    } 
    = useInput(checkNull)
    let formValided = true
    if(emailIsValid && passwordIsValid) {
        formValided = false
    }

    const [loginError, setLoginError] = useState(false)
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoginError(false)
        try{
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue,
                })
            })
            if(!response.ok) {
                throw new Error(response.status == 401 ? "login error" : "something went wrong")
            }
            const data = await response.json()
            const expirationTime = new Date(
                new Date().getTime() + +data.expiresIn * 1000
              );
              console.log(data)
                dispatch(login(expirationTime.toISOString(), data))
                navigate("/")
        }
        catch(e){
            setLoginError(true)
            console.log(e)
        }
    }

    return (
        <form className="input-form form-flex" onSubmit={submitHandler}>
            <label>Email:</label>
            <input className="input-field-text" type="email" value={emailValue} onChange={emailChangeHandler} onBlur={emailBlurHandler}/>
            {emailError && <p>Email is not vaild</p>}
            <label>Password</label>
            <input className="input-field-text"  type="password" value={passwordValue} onChange={passwordChangeHandler} onBlur={passwordBlurHandler}/>
            {passwordError && <p>Password is not vaild</p>}
            <button disabled={formValided} className="btn">Log In</button>
            {loginError && <p>username or password is incorrect</p>}
        </form>
    )
}
export default Login
