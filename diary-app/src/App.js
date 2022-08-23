import {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {getEntries} from "./store/actions/action"
import {Routes, Route, Navigate} from "react-router-dom"
import Layout from "./components/layout/Layout"
import UpdateEntry from "./pages/UpdateEntry"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Error404 from "./pages/Error404"
import Stories from "./pages/Stories"
import Search from "./pages/Search"


//rahce
function App() {
  const dispatch = useDispatch()
  const {isLoggedIn, token} = useSelector(state => state.auth)
  
  useEffect(() => { 
    dispatch(getEntries(token))
  }, [dispatch]) 
  console.log(isLoggedIn)
  return (
    <Layout>
      <Routes>
        
          {isLoggedIn &&<Route path="/" element={<Navigate replace to="/home"/>}/>}
          {isLoggedIn && <Route path="/home" element={<Home/>}/>}
          {isLoggedIn && <Route path="/entry/:id" element={<UpdateEntry/>}/>}
          {isLoggedIn && <Route path="/stories/:pageNumber" element={<Stories/>}/>}
          {isLoggedIn && <Route path="/stories" element={<Stories/>}/>}
          {isLoggedIn && <Route path="/search" element={<Search/>}/>}


          {!isLoggedIn && <Route path="/login" element={<Login/>}/>}
          {!isLoggedIn && <Route path="/signup" element={<Signup/>}/>}
          {!isLoggedIn && <Route path="/" element={<Navigate replace to="/login"/>}/>}
          <Route path="*" element={Error404}/>
      </Routes>
    </Layout>
    
  );
}

export default App;
