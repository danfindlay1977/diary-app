import {useSelector} from "react-redux"
import EntryItem from "../components/diary-entry/Entry-item"

function Search(props) {
    const searchItems = useSelector(state => state.UI.searchItems.data) 
    const entryItems = searchItems.map(items => <EntryItem title={items.title} topic={items.topic} key={items._id}/>)
    return (
        <div className="search-grid">
           {entryItems.length == 0 && <p>No entries found</p>}
           {entryItems}
            
        </div>
    )
}

export default Search
 