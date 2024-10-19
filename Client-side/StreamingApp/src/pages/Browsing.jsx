import NavBar from "../components/NavBar"
import Sidebar from "../components/Sidebar"
export default function Browsing(props) {
    return(
        <>
            <NavBar routing="index"/>
            <Sidebar routing="browsing"/>
        </>
    )
}