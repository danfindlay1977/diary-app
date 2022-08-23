import {Link} from "react-router-dom"
const SidebarItem = (props) => {
    return(
      <li className={props.hideItem ? "hide-items" : ""}><Link to={props.link}>{props.itemName}</Link></li>
    )
}
export default SidebarItem