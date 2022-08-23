import {Fragment, useState, useEffect} from "react"
import {useSelector} from "react-redux"
import EntryItem from "./Entry-item"
const DiaryEntry = () => {
    const [entryIndex, setEntryIndex] = useState(0)
    const entries =  useSelector(state => state.entries)

    const increamentSlider = () => {
        if(entryIndex +1 > entries.length -1) {
            setEntryIndex(0)
        }
        else{
            setEntryIndex(prevState => prevState + 1)
        }
        
    }
    const decrementSlider = () => {
        if(entryIndex -1 < 0) {
            setEntryIndex(0)
         }
         else{
            setEntryIndex(prevState => prevState - 1)
         }
  
    }
   const  list = entries.map(data => {
       console.log(data.entry.length)
       return <EntryItem
        title={data.title} 
        topic={data.topic}
        entry={data.entry.length > 250 ? `${data.entry.slice(0,250)}....` : data.entry}
        key={data._id}
        id={data._id}
        />
   })
    return (
        <Fragment>
        <h2>Latest Entries</h2>
        <section className="entry-slider" >
             <span onClick={increamentSlider} className="slider-btn slider-btn-left">&#10095;</span>
            {list[entryIndex]}
            <span onClick={decrementSlider} className="slider-btn slider-btn-right">&#10095;</span>
        </section>
        </Fragment>
        
    )
}
export default DiaryEntry