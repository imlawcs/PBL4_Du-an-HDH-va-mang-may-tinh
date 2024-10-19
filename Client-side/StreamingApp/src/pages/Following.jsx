import NavBar from "../components/NavBar"
import Sidebar from "../components/Sidebar"
export default function Following() {
    return(
        <>
            <NavBar routing="index"/>
            <Sidebar routing="following"/>
        </>
    )
}