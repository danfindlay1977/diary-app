import {useState, useEffect} from "react"

const useInput = (validateValue) => {
    const [inputValue, setInputValue] = useState("")
    const [isTouched, setIsTouched] = useState(false);
    const valueIsValid = validateValue(inputValue)
    const hasError = !valueIsValid && isTouched 

    const inputValueChangeHandler = (e) => { 
        setInputValue(e.target.value)
    }
    const inputValueBlurHandler = (e) => {
        setIsTouched(true)
    }
    const resetHandler = () => {
        setInputValue("")
        setIsTouched(false)
    }

    return {
        value: inputValue,
        hasError,
        inputValueBlurHandler,
        inputValueChangeHandler,
        isValid : valueIsValid,
        resetHandler,
        isTouched

    }

}

export default useInput