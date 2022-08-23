import Controls from "../components/UI/Controls"
import StoryItems from "../components/UI/StoryItems"
import {useEffect , useState, useRef} from "react"
import {useSelector} from "react-redux"
import {useNavigate, useLocation} from "react-router-dom"
import Pagenation from "../components/UI/Pagenation"
let FIRST_RENDER = true
const ClASSES = ["stories-entry1", "stories-entry-large", "stories-entry-small1", "stories-entry-small2", "stories-entry2" ]
const Stories = ({match}) => {
    console.log(`look here match ${match}`)
    const pageNumber = 1
    const navigator = useNavigate()
    const location = useLocation()
    const params = location.search ? location.search : ""
    const token = useSelector(state => state.auth.token)
    const [wordLimit, setWordLimit] = useState(0)
    const [storiesState, setStoriesState] = useState([])
    const [urlFilter, setUrlFilter] = useState("")
    const urlFilterRef = useRef(urlFilter)
    urlFilterRef.current = urlFilter
    const [sorting, setSorting] = useState("")
    const [sortOrder, setSortOrder] = useState("Ascending")
    const [page, setPage] = useState(pageNumber)
    const [pages, setPages] = useState(null)

    useEffect(() => {
        const apiCall = async () => {
            try{
                let query;
                if (params && !urlFilterRef.current) {
                    query = params;
                  } else {
                    query = urlFilterRef.current;
                  }
                  // check if sorting is needed
                  if(sorting) {
                      if(query.length === 0) {
                        query = `?sort=${sorting}`
                      }
                      else{
                          query = query + "&sort=" + sorting
                      }
                  }
                  // check if pagenation is needed
                  if(page) {
                    if(query.length === 0) {
                        query = `?page=${page}`
                    }
                    else{
                        query = query + "&page=" + page
                    }
                  }
                const response = await fetch(`http://localhost:8080/api/entry/fetch${query}`, {
                    headers:{
                        "Authorization": `bearer ${token}`
                    }
                })
                const {entries, pages:totalPages} = await response.json()
                setStoriesState(entries)
                setPages(totalPages)
            }
            catch(e) {
                console.log(e)
            }
        }
            if(FIRST_RENDER) {
                FIRST_RENDER = false
                apiCall()
            }
            else{
                const timer =  setTimeout(() => {
                    buildFilter(wordLimit)
                    apiCall()
                }, 2000)
               
       
           return () => {
               clearTimeout(timer)
           }
            }
      
    }, [wordLimit, sorting, page])
  
    const SortChangeHandler = (e) => {
        setSortOrder(e.target.value)
        if (e.target.value === "Ascending") {
            setSorting("updatedAt");
          } else if (e.target.value === "Descending") {
            setSorting("-updatedAt");
          }
    }
    const rangeOnChangeHandler =  (e) => {
        setWordLimit(e.target.value)
    
    }
    const buildFilter = (value) => {
        const filter = `?wordCount[gte]=${value}`
        setUrlFilter(filter)
        navigator(filter)
    }

  const storyList =  storiesState.map((story, index) => {
       return <StoryItems classes={ClASSES[index]} title={story.title} topic={story.topic} entry={story.entry} key={story._id}/>
    })

    return (
       <section className="stories-grid">
         <Controls filterOrder={sortOrder} wordLimit={wordLimit} onSortChangeHandler={SortChangeHandler} onChangeHandler={rangeOnChangeHandler}/>
         {!storyList ? <p>There are no entries by this user</p> : storyList}
         <Pagenation page={page} pages={pages} onChangeHandler={setPage}/>
       </section>
    )
}

export default Stories
