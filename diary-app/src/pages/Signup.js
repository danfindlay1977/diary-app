import useInput from "../hooks/use-input";
import useHttp from "../hooks/use-http";
import { useEffect, useState } from "react";
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"

const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  const checkNull = (val) => val.trim() !== "";
  const checkMatch = (val) => {
     return val.trim() === passwordValue.trim()
  }
  const {
    value: firstNameValue,
    hasError: firstNameError,
    inputValueChangeHandler: firstNameChangeHandler,
    inputValueBlurHandler: firstNameBlurHandler,
    isValid: firstNameIsValid,
  } = useInput(checkNull);

  const {
    value: lastNameValue,
    hasError: lastNameError,
    inputValueChangeHandler: lastNameChangeHandler,
    inputValueBlurHandler: lastNameBlurHandler,
    isValid: lastNameIsValid,
  } = useInput(checkNull);

  const {
    value: emailValue,
    hasError: emailError,
    inputValueChangeHandler: emailChangeHandler,
    inputValueBlurHandler: emailBlurHandler,
    isValid: emailIsValid,
    isTouched: emailIsTouched,
  } = useInput(checkNull);
  const {
    value: passwordValue,
    hasError: passwordError,
    inputValueChangeHandler: passwordChangeHandler,
    inputValueBlurHandler: passwordBlurHandler,
    isValid: passwordIsValid,
  } = useInput(checkNull);
  const {
    value: rePasswordValue,
    hasError: rePasswordError,
    inputValueChangeHandler: rePasswordChangeHandler,
    inputValueBlurHandler: rePasswordBlurHandler,
    isValid: rePasswordIsValid,
  } = useInput(checkMatch);
  const {
    isLoading: loading,
    isError: errorMsg,
    sendRequest: sendData,
  } = useHttp();
  const [emailCheckValue, setEmailCheck] = useState(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      sendData(
        { url: `/api/auth/checkEmail/${emailValue}` },
        (data) => {
         setEmailCheck(data.emailUsed);
        }
      );
    }, 5000);
    return () => {
      clearTimeout(timer);
      setEmailCheck(false);
    };
  }, [emailValue, setEmailCheck]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstNameValue,
          lastName: lastNameValue,
          email: emailValue,
          password: passwordValue,
          rePassword: rePasswordValue,
        }),
      });
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      dispatch({type: "LOGIN", payload: data.token})
      navigate("/")
    } catch (e) {
      console.log(e);
    }
  };

  // check form vaildatiy
  let formValided = true
  if(firstNameIsValid && lastNameIsValid && emailIsValid && passwordIsValid && rePasswordIsValid) {
    formValided = false
  }

  return (
    <form className="input-form form-flex" onSubmit={submitHandler}>
      <label>First Name</label>
      <input
        type="text"
        value={firstNameValue}
        onChange={firstNameChangeHandler}
        onBlur={firstNameBlurHandler}
        className="input-field-text"
      />
      {firstNameError && <p>First name is incorrect</p>}
      <label>Last Name:</label>
      <input
        type="text"
        value={lastNameValue}
        onChange={lastNameChangeHandler}
        onBlur={lastNameBlurHandler}
        className="input-field-text"
      />
      {lastNameError && <p>Last name is incorrect</p>}
      <label>Email:</label>
      <input
        className="input-field-text"
        type="email"
        value={emailValue}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
      />
      {emailError && <p>Email is not vaild</p>}
      {!emailError && emailCheckValue && <p>Email has already been used </p>}
      {!emailError && !emailCheckValue && emailIsTouched && (
        <p>Email has not been used </p>
      )}
      <label>Password</label>
      <input
        className="input-field-text"
        type="password"
        value={passwordValue}
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
      />
      {passwordError && <p>Password is not vaild</p>}
      <label>Re enter password</label>
      <input
        className="input-field-text"
        type="password"
        value={rePasswordValue}
        onChange={rePasswordChangeHandler}
        onBlur={rePasswordBlurHandler}
      />
      {rePasswordError && <p>Password does not match</p>}
      <button disabled={formValided} className="btn">Sign Up</button>
    </form>
  );
};
export default Signup;
