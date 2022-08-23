import {useDispatch, useSelector} from "react-redux"
import {deleteEntry} from "../../store/actions/action"
import {useNavigate} from "react-router-dom"
const EntryItem = (props) => {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const deleteHandler = (id) => {
        dispatch(deleteEntry(id, token))
    }
    const updateHandler = () => {
        navigate(`/entry/${props.id}`)
    }
    return (
        <section className="entry-item">
            <section className="entry-item-title">
            <h4>Title</h4>
            <p>{props.title}</p>
            </section>
            <section className="entry-item-topic">
            <h4>Topic</h4>
            <p>{props.topic}</p>
            </section>
            <section className="entry-item-entry hide">
                <p>{props.entry}</p>
            </section>
            <section className="entry-item-btns">
            <button onClick={updateHandler} className="btn">Update Entry</button>
            <button className="btn" onClick={() => deleteHandler(props.id)}>Delete Entry</button>
            </section>
        </section>
    )
}
export default EntryItem