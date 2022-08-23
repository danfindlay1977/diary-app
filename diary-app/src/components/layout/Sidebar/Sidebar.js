import SidebarItem from "./SidebarItem"
import {useSelector} from "react-redux"
const Sidebar = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    return (
        <section className="sidebar">
            <ul className="sidebar-items">
            <SidebarItem link={"/"} itemName={"Home"}/>
           { isLoggedIn && <SidebarItem link={"/stories"} itemName={"Stories"}/>}
            <SidebarItem link={ isLoggedIn ? "/login": "/"} hideItem={"hide-item"} itemName={ isLoggedIn ? "login in": "log out"}/>
            <SidebarItem link={"/signup"} hideItem={"hide-item"} itemName={"sign up"}/>
            </ul>
          
        </section>
    )
}
export default Sidebar