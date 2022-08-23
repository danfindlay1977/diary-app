import {useDispatch} from "react-redux"
const Handburger = () => {
    const dispatch = useDispatch()
    const onClickHandler = () => {
        dispatch({type:"TOGGLE_NAV"})
    }
    return(
        <section onClick={onClickHandler} className="handburger">
            <div></div>
            <div></div>
            <div></div>
        </section>
    )
}
export default Handburger