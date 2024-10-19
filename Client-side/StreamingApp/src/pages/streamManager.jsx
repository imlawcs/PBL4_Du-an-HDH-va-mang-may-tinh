import MainContentPage from "../components/MainContentPage.jsx";
import NavBar from "../components/NavBar.jsx";
import Sidebar from "../components/Sidebar.jsx";

export default function StreamManager() {
    const name = "SM"
    
    return(
        <>
            <NavBar routing={name} navName="Stream Manager"/>
            <Sidebar routing={name} name="Tools"/>
            
        </>
        
        
    );
}