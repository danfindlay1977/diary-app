
import Header from "./Header/Header"
import Sidebar from "./Sidebar/Sidebar"
import {useSelector} from "react-redux"
const Layout = (props) => {
    const navState = useSelector(state => state.UI.nav)
    return(
        <div className="layout">
            <Header/>
            <section className="layout-wrapper">
             {navState && <Sidebar/>}
            <main className="flex-main">{props.children}</main>
            </section>
          
          
            </div>
        
       
    )
}
export default Layout