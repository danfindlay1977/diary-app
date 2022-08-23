import {Fragment, useRef} from "react"
import {useSelector, useDispatch} from "react-redux"
import {useParams, useNavigate} from "react-router-dom"
import {updateEntry} from "../store/actions/action"
import ContentEditable from 'react-contenteditable'
const UpdateEntry = () => {
    const navigator = useNavigate()
    const distpatch = useDispatch()
    const params = useParams()
    const {id} = params
    const entry = useSelector(state => state.entries.find(data => data._id === id))
    const token = useSelector(state => state.auth.token)
    const titleRef = useRef(entry.title)
    const topicRef = useRef(entry.topic)
    const entryRef = useRef(entry.entry)
    const updateRef = useRef(false)
   
    const onHandleSave = () => {
        if(updateRef.current) {
            const data = {
            title: titleRef.current.innerText,
            topic: topicRef.current.innerText,
            entry: entryRef.current.innerText

        }
        distpatch(updateEntry(data, token, id))
        }
        navigator("/")
    }
    const onHandleCancel = () => {
        const check = window.confirm("Do you want to leave your changes will not be saved")
        if(check) {
            navigator("/")
        }
    } 
    const onChangeHandler = () => {
        updateRef.current = true
    }
     return (
        <Fragment>
            <label>Title</label>
            <ContentEditable
                html={titleRef.current}
                innerRef={titleRef}
                onChange={onChangeHandler}
                tagName="p"
                className="edit-text"
            />
            <label>Topic</label>
            <ContentEditable 
            html={topicRef.current}
            innerRef={topicRef}
            onChange={onChangeHandler}
            tagName="p"
            className="edit-text"
            />
            <label>Entry</label>
            <ContentEditable
            html={entryRef.current}
            innerRef={entryRef}
            onChange={onChangeHandler}
            tagName="p"
            className="edit-text edit-entry"
            />
            <button onClick={onHandleSave} className="btn save-btn">Save</button>
            <button onClick={onHandleCancel} className="btn cancel-btn">Cancel</button> 
        </Fragment>
    ) 
}
export default UpdateEntry