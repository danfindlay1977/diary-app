import useInput from "../hooks/use-input"
import {useDispatch, useSelector} from "react-redux"
import {addEntry} from "../store/actions/action"
const DiaryInput = () => {
    const token = useSelector(state => state.auth.token)
    const checkNull = val => val.trim() !== ""
    const {
        value: titleValue, 
        hasError: titleError,
        inputValueChangeHandler: titleChangeHandler,
        inputValueBlurHandler: titleBlurHandler,
        resetHandler: titleReset,
        isValid: titleIsValid
    } 
    = useInput(checkNull)

    const {
        value: topicValue, 
        hasError: topicError,
        inputValueChangeHandler: topicChangeHandler,
        inputValueBlurHandler: topicBlurHandler,
        resetHandler: topicReset,
        isValid: topicIsValid
    } 
    = useInput(checkNull)

    const {
        value: entryValue, 
        hasError: entryError,
        inputValueChangeHandler: enteryChangeHandler,
        inputValueBlurHandler: enteryBlurHandler,
        resetHandler: entryReset,
        isValid: enteryIsValid
    } 
    = useInput(checkNull)
    let formValid = false
    if(titleIsValid && topicIsValid && enteryIsValid) {
        formValid = true
    }

    
    const dispatch = useDispatch()
 

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            title: titleValue,
            topic: topicValue,
            entry: entryValue
            
        }
        dispatch(addEntry(data, token))

    }

    
    return (
        <form className="input-form form-flex" onSubmit={submitHandler}>
            <div className="input-field input-flex">
                <label>Title</label>
                <input className="input-field-text" onChange={titleChangeHandler} onBlur={titleBlurHandler} value={titleValue} type="text" name="title" placeholder="Title of entry"/>
                {titleError && <p className="input-error-text">Title is a required field</p>}
            </div>
            <div className="input-field input-flex">
                <label>Topic</label>
                <input onChange={topicChangeHandler} onBlur={topicBlurHandler} value={topicValue} className="input-field-text" type="text" name="topic" placeholder="Topic of entry"/>
                {topicError && <p className="input-error-text">Topic is required</p>}
            </div>
            <div className="input-field input-flex">
                <label>Diary Entry</label>
                <textarea onChange={enteryChangeHandler} onBlur={enteryBlurHandler} value={entryValue} className="input-field-textarea" name="entry" placeholder="write a message here">
                </textarea>
                {entryError && <p className="input-error-text">Please add a diary entry</p>}
            </div>
            <button  className="btn">Add Post</button>
        </form>
    )
}
export default DiaryInput