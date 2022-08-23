import {Fragment, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import DiaryInput from "../components/Diary-input"
import DiaryEntry from "../components/diary-entry/Diary-entry"
import {getEntries} from '../store/actions/action'
const Home = () => {
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  useEffect(() => { 
    dispatch(getEntries(token))
  }, [dispatch]) 
    return (
    <Fragment>
        <DiaryInput/>
      <DiaryEntry/>
    </Fragment>
    )

}
export default Home