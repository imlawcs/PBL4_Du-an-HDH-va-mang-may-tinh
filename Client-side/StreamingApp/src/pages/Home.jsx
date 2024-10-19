import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
export default function Home(props) {
    const name = "index"
    return(
        <>
            <NavBar routing={name} />
            <Sidebar routing={name} />
        </>
    );
}